export type ThemeId = 'football' | 'weather' | 'calculator' | 'notes';
export type BrowserPref = 'default' | 'firefox' | 'ddg';

const TARGET_URL = 'https://web.grindr.com';

const KEYS = {
  pin: 'dlp',
  pinLen: 'dlpl',
  theme: 'dlt',
  browser: 'dlb',
  unlocked: 'dlu',
};

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function savePin(pin: string): Promise<void> {
  const hash = await sha256(pin);
  localStorage.setItem(KEYS.pin, hash);
  localStorage.setItem(KEYS.pinLen, String(pin.length));
}

export function getPinLength(): number {
  return parseInt(localStorage.getItem(KEYS.pinLen) ?? '4', 10);
}

export async function checkPin(pin: string): Promise<boolean> {
  const stored = localStorage.getItem(KEYS.pin);
  if (!stored) return false;
  const hash = await sha256(pin);
  return hash === stored;
}

export function hasPin(): boolean {
  return !!localStorage.getItem(KEYS.pin);
}

export function clearPin(): void {
  localStorage.removeItem(KEYS.pin);
  localStorage.removeItem(KEYS.pinLen);
}

export function getTheme(): ThemeId {
  return (localStorage.getItem(KEYS.theme) as ThemeId) ?? 'football';
}

export function saveTheme(theme: ThemeId): void {
  localStorage.setItem(KEYS.theme, theme);
  // Update service worker cache entry so manifest is regenerated on next install
  if ('caches' in window) {
    caches.open('discreet-v1').then(cache => {
      cache.put('/__theme__', new Response(theme));
    });
  }
}

export function isUnlocked(): boolean {
  return sessionStorage.getItem(KEYS.unlocked) === '1';
}

export function setUnlocked(): void {
  sessionStorage.setItem(KEYS.unlocked, '1');
}

export function lock(): void {
  sessionStorage.removeItem(KEYS.unlocked);
}

export function getBrowserPref(): BrowserPref {
  return (localStorage.getItem(KEYS.browser) as BrowserPref) ?? 'default';
}

export function saveBrowserPref(pref: BrowserPref): void {
  localStorage.setItem(KEYS.browser, pref);
}

export function clearBrowserPref(): void {
  localStorage.removeItem(KEYS.browser);
}

/**
 * Navigate to Grindr web using the user's preferred browser/privacy mode.
 * Browsers block programmatic incognito, so we use URL schemes for Firefox
 * and DuckDuckGo which support opening URLs directly in private mode.
 * Falls back to a regular new tab if the scheme isn't handled.
 */
export function openGrindr(): void {
  const pref = getBrowserPref();
  const encoded = encodeURIComponent(TARGET_URL);

  if (pref === 'firefox') {
    // Works on both iOS and Android Firefox
    const scheme = `firefox://open-url?url=${encoded}&private=true`;
    const fallback = TARGET_URL;
    launchScheme(scheme, fallback);
    return;
  }

  if (pref === 'ddg') {
    // DuckDuckGo browser — all tabs are private by default
    const scheme = `ddgQuickLink://${TARGET_URL}`;
    const fallback = TARGET_URL;
    launchScheme(scheme, fallback);
    return;
  }

  window.location.href = TARGET_URL;
}

function launchScheme(scheme: string, fallback: string): void {
  // Attempt the custom scheme; if the app isn't installed the browser
  // won't navigate away, so after 1.5 s we fall back to a regular tab.
  const start = Date.now();
  window.location.href = scheme;
  setTimeout(() => {
    // If we're still here (page didn't blur / app didn't open), fall back
    if (Date.now() - start < 2000) {
      window.location.href = fallback;
    }
  }, 1500);
}
