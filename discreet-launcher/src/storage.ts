export type ThemeId = 'football' | 'weather' | 'calculator' | 'notes';

const KEYS = {
  pin: 'dlp',
  theme: 'dlt',
  unlocked: 'dlu',
};

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function savePin(pin: string): Promise<void> {
  const hash = await sha256(pin);
  localStorage.setItem(KEYS.pin, hash);
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
