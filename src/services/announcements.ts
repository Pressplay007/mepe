import { supabase } from "../lib/supabase";
import { compareDateLabelsDesc } from "../lib/dateLabel";
import type { Announcement } from "../data/announcements";
import { logActivity } from "./activity";

const isPublished = (a: Announcement) => !a.status || a.status === "Published";

export function getLatestPublishedAnnouncement(
  announcements: Announcement[],
): Announcement | null {
  const published = announcements.filter(isPublished);
  if (published.length === 0) return null;

  return [...published].sort((a, b) =>
    compareDateLabelsDesc(a.date, b.date),
  )[0];
}

type Row = {
  id: string;
  title: string;
  date_label: string;
  category: string;
  summary: string;
  content: string;
  is_official: boolean;
  status: NonNullable<Announcement["status"]>;
};

const toAnnouncement = (row: Row): Announcement => ({
  id: row.id,
  title: row.title,
  date: row.date_label,
  category: row.category,
  summary: row.summary,
  content: row.content,
  isOfficial: row.is_official,
  status: row.status,
});

const toRow = (a: Omit<Announcement, "id">) => ({
  title: a.title,
  date_label: a.date,
  category: a.category,
  summary: a.summary,
  content: a.content,
  is_official: a.isOfficial ?? false,
  status: a.status ?? "Published",
});

export async function listAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toAnnouncement);
}

export async function createAnnouncement(
  input: Omit<Announcement, "id">,
): Promise<Announcement> {
  const { data, error } = await supabase
    .from("announcements")
    .insert(toRow(input))
    .select()
    .single();
  if (error) throw error;
  await logActivity("Announcement", `New announcement published: ${input.title}`);
  return toAnnouncement(data as Row);
}

export async function updateAnnouncement(
  id: string,
  input: Omit<Announcement, "id">,
): Promise<Announcement> {
  const { data, error } = await supabase
    .from("announcements")
    .update(toRow(input))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await logActivity("Announcement", `Announcement updated: ${input.title}`);
  return toAnnouncement(data as Row);
}

export async function deleteAnnouncement(id: string): Promise<void> {
  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) throw error;
  await logActivity("Announcement", "Announcement removed");
}
