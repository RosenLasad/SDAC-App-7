import { createClient } from "@supabase/supabase-js";
import { env, getBearerToken } from "./utils.mjs";

export function createSupabaseAdmin() {
  const url = env("SUPABASE_URL");
  const serviceRoleKey = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) {
    throw new Error("Variabili Supabase mancanti: SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

export async function getAuthenticatedUser(req, supabaseAdmin) {
  const token = getBearerToken(req);
  if (!token) {
    return { user: null, error: "Token mancante." };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) {
    return { user: null, error: "Sessione non valida." };
  }

  return { user: data.user, error: null };
}
