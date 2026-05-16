const CACHE = 'discreet-v1';

const THEME_CONFIGS = {
  football: {
    name: 'ScoreBoard',
    short_name: 'ScoreBoard',
    description: 'Live football scores',
    background_color: '#1a7c3e',
    theme_color: '#1a7c3e',
    icon_path: '/icons/football/',
  },
  weather: {
    name: 'WeatherNow',
    short_name: 'WeatherNow',
    description: 'Local weather forecast',
    background_color: '#2563eb',
    theme_color: '#2563eb',
    icon_path: '/icons/weather/',
  },
  calculator: {
    name: 'Calculator',
    short_name: 'Calculator',
    description: 'Simple calculator',
    background_color: '#1c1c1e',
    theme_color: '#1c1c1e',
    icon_path: '/icons/calculator/',
  },
  notes: {
    name: 'Daily Notes',
    short_name: 'Notes',
    description: 'Personal notes',
    background_color: '#fef9c3',
    theme_color: '#ca8a04',
    icon_path: '/icons/notes/',
  },
};

async function getTheme() {
  try {
    const clients = await self.clients.matchAll();
    // Read from a shared cache entry set by the app
    const cache = await caches.open(CACHE);
    const themeResp = await cache.match('/__theme__');
    if (themeResp) {
      const text = await themeResp.text();
      return text.trim();
    }
  } catch (_) {}
  return 'football';
}

async function serveManifest(baseUrl) {
  const theme = await getTheme();
  const cfg = THEME_CONFIGS[theme] || THEME_CONFIGS.football;

  const manifest = {
    name: cfg.name,
    short_name: cfg.short_name,
    description: cfg.description,
    start_url: '/',
    display: 'standalone',
    background_color: cfg.background_color,
    theme_color: cfg.theme_color,
    icons: [
      { src: cfg.icon_path + 'icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: cfg.icon_path + 'icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' },
  });
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === '/manifest.json') {
    event.respondWith(serveManifest(url.origin));
    return;
  }
  // Network-first for everything else
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
