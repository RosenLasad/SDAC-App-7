export function env(name, fallback = "") {
  try {
    if (typeof Netlify !== "undefined" && Netlify?.env?.get) {
      const value = Netlify.env.get(name);
      if (value != null && value !== "") return value;
    }
  } catch (error) {
    // ignore
  }
  return process.env[name] ?? fallback;
}

export function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders
    }
  });
}

export function methodNotAllowed() {
  return json({ error: "Metodo non consentito." }, 405);
}

export function getBearerToken(req) {
  const header = req.headers.get("authorization") || req.headers.get("Authorization") || "";
  if (!header.startsWith("Bearer ")) return "";
  return header.slice(7).trim();
}

export function getAppUrl(req) {
  const configured = env("APP_URL", "").trim();
  if (configured) return configured.replace(/\/$/, "");

  const origin = req.headers.get("origin");
  if (origin) return origin.replace(/\/$/, "");

  const url = new URL(req.url);
  return `${url.protocol}//${url.host}`;
}
