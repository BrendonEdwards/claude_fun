/**
 * HMRC Fraud Prevention Headers
 *
 * HMRC requires specific fraud prevention headers on every API call.
 * These are a legal requirement under UK tax law.
 *
 * For a web application, the client collects browser-side data and
 * passes it to the server, which combines it with server-side info.
 */

export interface ClientFraudData {
  /** User's timezone, e.g. "UTC+00:00" */
  timezone: string;
  /** Screen dimensions, e.g. "width=1920&height=1080&scaling-factor=1&colour-depth=24" */
  screens: string;
  /** Browser window size, e.g. "width=1200&height=800" */
  windowSize: string;
  /** Browser user-agent string */
  userAgent: string;
  /** Browser plugins/do-not-track info */
  browserPlugins?: string;
  /** JS-detected device ID (if available) */
  deviceId?: string;
}

/**
 * Build the fraud prevention headers required by HMRC.
 *
 * @param clientData - Data collected from the user's browser
 * @param userId - The user's identifier (e.g. email or NINO)
 * @returns Record of header name → value
 */
export function buildFraudHeaders(
  clientData: ClientFraudData,
  userId: string
): Record<string, string> {
  const headers: Record<string, string> = {
    "Gov-Client-Connection-Method": "WEB_APP_VIA_SERVER",
    "Gov-Client-User-IDs": `quarterlyuk=${encodeURIComponent(userId)}`,
    "Gov-Client-Timezone": clientData.timezone,
    "Gov-Client-Screens": clientData.screens,
    "Gov-Client-Window-Size": clientData.windowSize,
    "Gov-Client-Browser-JS-User-Agent": clientData.userAgent,
    "Gov-Vendor-Version": "QuarterlyUK=1.0.0",
    "Gov-Vendor-License-IDs": "QuarterlyUK=free",
    "Gov-Vendor-Product-Name": "QuarterlyUK",
  };

  if (clientData.browserPlugins) {
    headers["Gov-Client-Browser-Plugins"] = clientData.browserPlugins;
  }

  if (clientData.deviceId) {
    headers["Gov-Client-Device-ID"] = clientData.deviceId;
  }

  return headers;
}

/**
 * Client-side helper to collect fraud prevention data.
 * Call this in the browser and send the result to API routes.
 *
 * Usage in React component:
 *   const fraudData = collectClientFraudData();
 *   fetch('/api/hmrc/submit', { body: JSON.stringify({ ...payload, fraudData }) });
 */
export function collectClientFraudData(): ClientFraudData {
  const now = new Date();
  const offsetMinutes = now.getTimezoneOffset();
  const sign = offsetMinutes <= 0 ? "+" : "-";
  const absMinutes = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absMinutes / 60)).padStart(2, "0");
  const mins = String(absMinutes % 60).padStart(2, "0");
  const timezone = `UTC${sign}${hours}:${mins}`;

  const screen = typeof window !== "undefined" ? window.screen : null;
  const screens = screen
    ? `width=${screen.width}&height=${screen.height}&scaling-factor=${window.devicePixelRatio || 1}&colour-depth=${screen.colorDepth}`
    : "width=0&height=0&scaling-factor=1&colour-depth=24";

  const windowSize =
    typeof window !== "undefined"
      ? `width=${window.innerWidth}&height=${window.innerHeight}`
      : "width=0&height=0";

  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "unknown";

  return {
    timezone,
    screens,
    windowSize,
    userAgent,
  };
}
