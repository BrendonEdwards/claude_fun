/**
 * HMRC Fraud Prevention Headers
 *
 * HMRC requires specific fraud prevention headers on every MTD API call.
 * These are a legal requirement under UK tax law.
 *
 * Connection method: WEB_APP_VIA_SERVER
 *
 * Client-side: collectClientFraudData() gathers browser data and sends it
 * to the server in the request body.
 *
 * Server-side: buildFraudHeaders() combines client data with server-side
 * data extracted from the incoming request (IP, port, forwarding chain).
 */

/** Strip newlines and control characters from client-supplied values. */
function sanitize(val: string): string {
  return val.replace(/[\r\n\x00-\x1f]/g, "");
}

/** Percent-encode a header value per HMRC spec (RFC 3986 unreserved chars are safe). */
function hmrcEncode(val: string): string {
  // HMRC requires percent-encoding of values. Use encodeURIComponent but
  // leave certain chars that are valid in header values unencoded.
  return encodeURIComponent(val)
    .replace(/%20/g, "%20") // keep space encoded
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A");
}

export interface ClientFraudData {
  /** User's timezone, e.g. "UTC+00:00" */
  timezone: string;
  /** Screen dimensions, e.g. "width=1920&height=1080&scaling-factor=1&colour-depth=24" */
  screens: string;
  /** Browser window size, e.g. "width=1200&height=800" */
  windowSize: string;
  /** Browser user-agent string */
  userAgent: string;
  /** Browser plugins, comma-separated. Empty string if none. */
  browserPlugins: string;
  /** Do Not Track setting: "true" or "false" */
  doNotTrack: string;
  /** SHA-256 hashed device ID (hex string), persisted in localStorage */
  deviceId: string;
  /** Local IPs detected via WebRTC (comma-separated), or empty string */
  localIPs: string;
  /** ISO 8601 timestamp of when local IPs were collected */
  localIPsTimestamp: string;
}

/**
 * Server-side request metadata extracted from the incoming HTTP request.
 * Must be passed by each API route handler.
 */
export interface ServerRequestData {
  /** Client's public IP from x-forwarded-for or x-real-ip */
  clientIP: string;
  /** ISO 8601 timestamp of when the IP was observed */
  clientIPTimestamp: string;
  /** Client's source port from x-forwarded-port (or empty string if unavailable) */
  clientPort: string;
  /** The full forwarding chain (x-forwarded-for value), or empty string */
  forwardingChain: string;
  /** The server's own public IP (from request headers or env var) */
  vendorPublicIP: string;
}

/**
 * Extract server-side request metadata from a Next.js Request object.
 * Call this in each API route and pass the result to buildFraudHeaders.
 */
export function extractServerData(request: Request): ServerRequestData {
  const headers = request.headers;
  const now = new Date().toISOString();

  // Client IP: prefer x-forwarded-for (first entry is the original client),
  // fall back to x-real-ip
  const xForwardedFor = headers.get("x-forwarded-for") || "";
  const clientIP = xForwardedFor
    ? xForwardedFor.split(",")[0].trim()
    : headers.get("x-real-ip") || "";

  // Client port: Vercel doesn't always provide this, but check common headers
  const clientPort =
    headers.get("x-forwarded-port") ||
    headers.get("x-real-port") ||
    "";

  // Forwarding chain: the full x-forwarded-for value represents hops
  const forwardingChain = xForwardedFor;

  // Vendor (server) public IP: On Vercel serverless, the egress IP is not
  // available in request headers. Set VENDOR_PUBLIC_IP env var if known.
  const vendorPublicIP = process.env.VENDOR_PUBLIC_IP || "";

  return {
    clientIP,
    clientIPTimestamp: now,
    clientPort,
    forwardingChain,
    vendorPublicIP,
  };
}

/**
 * Build the complete set of fraud prevention headers required by HMRC
 * for the WEB_APP_VIA_SERVER connection method.
 *
 * @param clientData - Data collected from the user's browser
 * @param userId - The user's identifier (e.g. NINO)
 * @param serverData - Data extracted from the incoming server request
 * @returns Record of header name to value
 */
export function buildFraudHeaders(
  clientData: ClientFraudData,
  userId: string,
  serverData: ServerRequestData
): Record<string, string> {
  const headers: Record<string, string> = {};

  // 1. Connection method (required, fixed value)
  headers["Gov-Client-Connection-Method"] = "WEB_APP_VIA_SERVER";

  // 2. Client public IP
  headers["Gov-Client-Public-IP"] = sanitize(serverData.clientIP);

  // 3. Client public IP timestamp
  headers["Gov-Client-Public-IP-Timestamp"] = sanitize(
    serverData.clientIPTimestamp
  );

  // 4. Client public port
  headers["Gov-Client-Public-Port"] = sanitize(serverData.clientPort);

  // 5. Device ID (SHA-256 hashed, sent from client)
  headers["Gov-Client-Device-ID"] = sanitize(clientData.deviceId);

  // 6. User IDs
  headers["Gov-Client-User-IDs"] = `quarterlyuk=${hmrcEncode(
    sanitize(userId)
  )}`;

  // 7. Client timezone
  headers["Gov-Client-Timezone"] = hmrcEncode(sanitize(clientData.timezone));

  // 8. Client local IPs (empty string is acceptable)
  headers["Gov-Client-Local-IPs"] = clientData.localIPs
    ? hmrcEncode(sanitize(clientData.localIPs))
    : "";

  // 9. Client local IPs timestamp
  headers["Gov-Client-Local-IPs-Timestamp"] = sanitize(
    clientData.localIPsTimestamp
  );

  // 10. Client screens
  headers["Gov-Client-Screens"] = hmrcEncode(sanitize(clientData.screens));

  // 11. Client window size
  headers["Gov-Client-Window-Size"] = hmrcEncode(
    sanitize(clientData.windowSize)
  );

  // 12. Browser plugins (always sent, empty string if none)
  headers["Gov-Client-Browser-Plugins"] = clientData.browserPlugins
    ? hmrcEncode(sanitize(clientData.browserPlugins))
    : "";

  // 13. Browser Do Not Track
  headers["Gov-Client-Browser-Do-Not-Track"] = sanitize(
    clientData.doNotTrack
  );

  // 14. Browser JS user agent
  headers["Gov-Client-Browser-JS-User-Agent"] = hmrcEncode(
    sanitize(clientData.userAgent)
  );

  // 15. Vendor version
  headers["Gov-Vendor-Version"] = "QuarterlyUK=1.0.0";

  // 16. Vendor license IDs
  headers["Gov-Vendor-License-IDs"] = "QuarterlyUK=free";

  // 17. Vendor product name
  headers["Gov-Vendor-Product-Name"] = "QuarterlyUK";

  // 18. Vendor public IP
  headers["Gov-Vendor-Public-IP"] = sanitize(serverData.vendorPublicIP);

  // 19. Vendor forwarding (hops between client and server)
  headers["Gov-Vendor-Forwarding"] = serverData.forwardingChain
    ? hmrcEncode(sanitize(serverData.forwardingChain))
    : "";

  return headers;
}

/**
 * Client-side helper to collect fraud prevention data.
 * Call this in the browser and send the result to API routes.
 *
 * Usage in React component:
 *   const fraudData = await collectClientFraudData();
 *   fetch('/api/hmrc/submit', { body: JSON.stringify({ ...payload, fraudData }) });
 */
export async function collectClientFraudData(): Promise<ClientFraudData> {
  // Timezone
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const sign = offsetMinutes <= 0 ? "+" : "-";
  const absMinutes = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absMinutes / 60)).padStart(2, "0");
  const mins = String(absMinutes % 60).padStart(2, "0");
  const timezone = `UTC${sign}${hours}:${mins}`;

  // Screens
  const screen = typeof window !== "undefined" ? window.screen : null;
  const screens = screen
    ? `width=${screen.width}&height=${screen.height}&scaling-factor=${
        window.devicePixelRatio || 1
      }&colour-depth=${screen.colorDepth}`
    : "width=0&height=0&scaling-factor=1&colour-depth=24";

  // Window size
  const windowSize =
    typeof window !== "undefined"
      ? `width=${window.innerWidth}&height=${window.innerHeight}`
      : "width=0&height=0";

  // User agent
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "unknown";

  // Browser plugins
  let browserPlugins = "";
  if (typeof navigator !== "undefined" && navigator.plugins) {
    const pluginNames: string[] = [];
    for (let i = 0; i < navigator.plugins.length; i++) {
      pluginNames.push(navigator.plugins[i].name);
    }
    browserPlugins = pluginNames.join(",");
  }

  // Do Not Track
  let doNotTrack = "false";
  if (typeof navigator !== "undefined") {
    // navigator.doNotTrack can be "1", "0", "yes", "no", "unspecified", or null
    const dnt = navigator.doNotTrack;
    if (dnt === "1" || dnt === "yes") {
      doNotTrack = "true";
    }
  }

  // Device ID: generate a UUID, persist in localStorage, hash with SHA-256
  const deviceId = await getOrCreateDeviceId();

  // Local IPs: WebRTC is unreliable and being deprecated; send empty
  const localIPs = "";
  const localIPsTimestamp = new Date().toISOString();

  return {
    timezone,
    screens,
    windowSize,
    userAgent,
    browserPlugins,
    doNotTrack,
    deviceId,
    localIPs,
    localIPsTimestamp,
  };
}

/**
 * Generate a persistent device ID, stored in localStorage.
 * Returns the SHA-256 hash of the UUID as a hex string.
 */
async function getOrCreateDeviceId(): Promise<string> {
  const STORAGE_KEY = "quarterlyuk_device_id";

  if (typeof window === "undefined" || typeof crypto === "undefined") {
    return "";
  }

  let rawId = localStorage.getItem(STORAGE_KEY);
  if (!rawId) {
    rawId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, rawId);
  }

  // SHA-256 hash
  const encoder = new TextEncoder();
  const data = encoder.encode(rawId);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}
