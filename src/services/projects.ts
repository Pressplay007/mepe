import { supabase } from "../lib/supabase";
import type { Project } from "../data/projects";
import { logActivity } from "./activity";

type Row = {
  id: string;
  title: string;
  category: string;
  status: Project["status"];
  progress: number;
  description: string;
  lead: string;
  budget: string | null;
};

const toProject = (row: Row): Project => ({
  id: row.id,
  title: row.title,
  category: row.category,
  status: row.status,
  progress: row.progress,
  description: row.description,
  lead: row.lead,
  budget: row.budget ?? undefined,
});

const toRow = (p: Omit<Project, "id">) => ({
  title: p.title,
  category: p.category,
  status: p.status,
  progress: p.progress,
  description: p.description,
  lead: p.lead,
  budget: p.budget ?? null,
});

export async function listProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(toProject);
}

export async function createProject(
  input: Omit<Project, "id">,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .insert(toRow(input))
    .select()
    .single();
  if (error) throw error;
  await logActivity("Project", `New project added: ${input.title}`);
  return toProject(data as Row);
}

export async function updateProject(
  id: string,
  input: Omit<Project, "id">,
): Promise<Project> {
  const { data, error } = await supabase
    .from("projects")
    .update(toRow(input))
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await logActivity("Project", `Project updated: ${input.title}`);
  return toProject(data as Row);
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
  await logActivity("Project", "Project removed");
}
