import { supabase } from "../lib/supabase";

export interface DashboardStats {
  team: number;
  announcements: number;
  upcomingEvents: number;
  liveProjects: number;
}

const countOf = async (
  table: string,
  modify?: (q: ReturnType<typeof baseCount>) => ReturnType<typeof baseCount>,
): Promise<number> => {
  let query = baseCount(table);
  if (modify) query = modify(query);
  const { count, error } = await query;
  if (error) throw error;
  return count ?? 0;
};

const baseCount = (table: string) =>
  supabase.from(table).select("*", { count: "exact", head: true });

export async function getDashboardStats(): Promise<DashboardStats> {
  const [team, announcements, upcomingEvents, liveProjects] = await Promise.all([
    countOf("team_members"),
    countOf("announcements"),
    countOf("events", (q) => q.eq("status", "Upcoming")),
    countOf("projects", (q) => q.eq("status", "In Progress")),
  ]);

  return { team, announcements, upcomingEvents, liveProjects };
}
