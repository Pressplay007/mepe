// Supabase Edge Function: create-admin
// Securely creates a new admin login account + profile using the service-role
// key (which must NEVER be exposed in the browser). Only callable by a
// logged-in Super Admin.
//
// Deploy with the Supabase CLI:
//   supabase functions deploy create-admin
//
// It reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from the function's
// environment (these are injected automatically by Supabase).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify the caller is an authenticated Super Admin.
    const authHeader = req.headers.get("Authorization") ?? "";
    const callerClient = createClient(url, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
    } = await callerClient.auth.getUser();

    if (!user) {
      return json({ error: "Not authenticated" }, 401);
    }

    const { data: caller } = await callerClient
      .from("admins")
      .select("role, status")
      .eq("id", user.id)
      .single();

    if (!caller || caller.role !== "Super Admin" || caller.status !== "Active") {
      return json({ error: "Only Super Admins can create administrators" }, 403);
    }

    const { name, email, password, role } = await req.json();
    if (!name || !email || !password) {
      return json({ error: "name, email and password are required" }, 400);
    }

    const admin = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: created, error: createErr } =
      await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name, role: role ?? "Moderator" },
      });

    if (createErr || !created.user) {
      return json({ error: createErr?.message ?? "Failed to create user" }, 400);
    }

    // The on_auth_user_created trigger inserts the profile; make sure the
    // role/name are correct (trigger uses metadata, but enforce here too).
    await admin
      .from("admins")
      .update({ name, role: role ?? "Moderator", status: "Active" })
      .eq("id", created.user.id);

    return json({ id: created.user.id, email, name, role: role ?? "Moderator" });
  } catch (err) {
    return json({ error: String(err) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
