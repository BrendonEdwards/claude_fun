/**
 * Client-side HMRC token management.
 * Handles reading, storing, and refreshing HMRC OAuth tokens from localStorage.
 */

const STORAGE_KEY = "quk_hmrc_tokens";

interface StoredTokens {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  stored_at?: number;
}

export function getStoredTokens(): StoredTokens | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveTokens(tokens: StoredTokens): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...tokens, stored_at: Date.now() })
  );
}

/**
 * Get a valid access token, refreshing if needed.
 * Returns the access token string or throws an error.
 */
export async function getValidAccessToken(): Promise<string> {
  const tokens = getStoredTokens();
  if (!tokens?.access_token) {
    throw new Error("Not connected to HMRC. Please connect first.");
  }

  // Check if token is likely expired (stored_at + expires_in)
  const storedAt = tokens.stored_at || (tokens as Record<string, unknown>).connected_at as number | undefined;
  const isExpired =
    storedAt &&
    tokens.expires_in &&
    Date.now() > storedAt + tokens.expires_in * 1000 - 60_000; // 1 min buffer

  if (!isExpired) {
    return tokens.access_token;
  }

  // Try to refresh
  if (!tokens.refresh_token) {
    throw new Error("Token expired and no refresh token available. Please reconnect to HMRC.");
  }

  return refreshTokens(tokens.refresh_token);
}

/**
 * Refresh tokens after an INVALID_CREDENTIALS error.
 * Returns the new access token.
 */
export async function refreshTokens(refreshToken: string): Promise<string> {
  const res = await fetch("/api/hmrc/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || "Token refresh failed. Please reconnect to HMRC.");
  }

  saveTokens({
    access_token: data.access_token,
    refresh_token: data.refresh_token || refreshToken,
    expires_in: data.expires_in,
  });

  return data.access_token;
}
