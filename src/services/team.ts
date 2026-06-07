import { supabase } from "../lib/supabase";
import type { TeamMember } from "../data/team";
import { logActivity } from "./activity";

const BUCKET = "team-photos";

type Row = {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio: string | null;
  sort_order: number;
};

const toMember = (row: Row): TeamMember => ({
  id: row.id,
  name: row.name,
  role: row.role,
  image: row.image_url ?? "",
  bio: row.bio ?? undefined,
});

export async function listTeam(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as Row[]).map(toMember);
}

export async function uploadTeamPhoto(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function createTeamMember(input: {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}): Promise<TeamMember> {
  const { data, error } = await supabase
    .from("team_members")
    .insert({
      name: input.name,
      role: input.role,
      image_url: input.image ?? null,
      bio: input.bio ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  await logActivity("Team", `New member added: ${input.name}`);
  return toMember(data as Row);
}

export async function updateTeamMember(
  id: string,
  input: { name: string; role: string; image?: string; bio?: string },
): Promise<TeamMember> {
  const { data, error } = await supabase
    .from("team_members")
    .update({
      name: input.name,
      role: input.role,
      image_url: input.image ?? null,
      bio: input.bio ?? null,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await logActivity("Team", `Member updated: ${input.name}`);
  return toMember(data as Row);
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw error;
  await logActivity("Team", "Member removed from directory");
}
