import { supabase } from "../lib/supabase";

export interface ActivityItem {
  id: string;
  type: string;
  action: string;
  actor: string | null;
  createdAt: string;
}

export async function logActivity(type: string, action: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const actor =
    (user?.user_metadata?.name as string | undefined) ?? user?.email ?? null;

  // Fire-and-forget: never block the main action on logging failure.
  await supabase.from("activity_log").insert({ type, action, actor });
}

export async function getRecentActivity(limit = 6): Promise<ActivityItem[]> {
  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    type: row.type,
    action: row.action,
    actor: row.actor,
    createdAt: row.created_at,
  }));
}
