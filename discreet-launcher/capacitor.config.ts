import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scoreboard.live',
  appName: 'ScoreBoard',
  webDir: 'dist',
  server: {
    // Allow Grindr to load inside the native WebView (no browser, no URL bar)
    allowNavigation: ['*.grindr.com', 'grindr.com'],
    androidScheme: 'https',
  },
  android: {
    allowMixedContent: false,
    // Override user-agent to look like a standard Chrome browser
    overrideUserAgent: 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
    backgroundColor: '#000000',
  },
};

export default config;
