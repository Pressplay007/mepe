import { supabase } from "../lib/supabase";
import type { AdminData } from "../components/admin/AddAdminSheet";
import { logActivity } from "./activity";

type Row = {
  id: string;
  name: string;
  email: string;
  role: AdminData["role"];
  status: AdminData["status"];
  last_login: string | null;
};

const toAdmin = (row: Row): AdminData => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
  status: row.status,
  lastLogin: row.last_login
    ? new Date(row.last_login).toLocaleDateString()
    : "Never",
});

export async function listAdmins(): Promise<AdminData[]> {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data as Row[]).map(toAdmin);
}

// Creating a login account requires the service-role key, so it goes through
// the secure `create-admin` edge function rather than the browser client.
export async function createAdmin(input: {
  name: string;
  email: string;
  password: string;
  role: AdminData["role"];
}): Promise<void> {
  const { error } = await supabase.functions.invoke("create-admin", {
    body: input,
  });
  if (error) throw error;
  await logActivity("Admin", `New administrator added: ${input.name}`);
}

export async function updateAdmin(
  id: string,
  input: { name: string; role: AdminData["role"]; status: AdminData["status"] },
): Promise<AdminData> {
  const { data, error } = await supabase
    .from("admins")
    .update({ name: input.name, role: input.role, status: input.status })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  await logActivity("Admin", `Administrator updated: ${input.name}`);
  return toAdmin(data as Row);
}

export async function deleteAdmin(id: string): Promise<void> {
  // Removes the admin profile (revokes dashboard access via RLS). Fully
  // deleting the underlying auth account requires the service role / dashboard.
  const { error } = await supabase.from("admins").delete().eq("id", id);
  if (error) throw error;
  await logActivity("Admin", "Administrator access revoked");
}
