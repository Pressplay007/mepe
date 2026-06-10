import { supabase } from "../lib/supabase";
import type { Event } from "../data/events";
import { logActivity } from "./activity";

const STORAGE_BUCKET = "media";

export async function uploadEventImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `events/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(STORAGE_BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

type Row = {
  id: string;
  title: string;
  date_label: string;
  location: string;
  category: Event["category"];
  status: Event["status"];
  description: string;
  image_url: string | null;
};

const toEvent = (row: Row): Event => ({
  id: row.id,
  title: row.title,
  date: row.date_label,
  location: row.location,
  category: row.category,
  status: row.status,
  description: row.description,
  image: row.image_url ?? undefined,
});

const toRow = (e: Omit<Event, "id">) => ({
  title: e.title,
  date_label: e.date,
  location: e.location,
  category: e.category,
  status: e.status,
  description: e.description,
  image_url: e.image ?? null,
});

export async function listEvents(): Promise<Event[]> {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toEvent);
}

export async function createEvent(input: Omit<Event, "id">): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .insert(toRow(input))
    .select()
    .single();
  if (error) throw error;
  await logActivity("Event", `New event created: ${input.title}`);
  return toEvent(data as Row);
}

export async function updateEvent(
  id: string,
  input: Omit<Event, "id">,
): Promise<Event> {
  const { data, error } = await supabase
    .from("events")
    .update(toRow(input))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await logActivity("Event", `Event updated: ${input.title}`);
  return toEvent(data as Row);
}

export async function deleteEvent(id: string): Promise<void> {
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw error;
  await logActivity("Event", "Event removed from calendar");
}
