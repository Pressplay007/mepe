import { supabase } from "../lib/supabase";

export interface CurrentAdmin {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Moderator";
}

export async function login(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  // Best-effort: stamp last login on the profile.
  if (data.user) {
    await supabase
      .from("admins")
      .update({ last_login: new Date().toISOString() })
      .eq("id", data.user.id);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("admins")
    .select("id, name, email, role")
    .eq("id", user.id)
    .single();

  if (profile) return profile as CurrentAdmin;

  // Fallback to auth metadata if the profile row is missing.
  return {
    id: user.id,
    name: (user.user_metadata?.name as string) ?? user.email ?? "Admin",
    email: user.email ?? "",
    role: (user.user_metadata?.role as CurrentAdmin["role"]) ?? "Moderator",
  };
}

export async function updateProfile(name: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error: metaError } = await supabase.auth.updateUser({
    data: { name },
  });
  if (metaError) throw metaError;

  const { error } = await supabase
    .from("admins")
    .update({ name })
    .eq("id", user.id);
  if (error) throw error;
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) throw new Error("Not authenticated");

  // Re-authenticate to confirm the current password is correct.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (verifyError) throw new Error("Current password is incorrect");

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

export function onAuthChange(callback: (signedIn: boolean) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(!!session);
  });
  return () => data.subscription.unsubscribe();
}
