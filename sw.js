const CACHE_NAME = 'neon-survivor-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './index.css',
  './game.js',
  './entities.js',
  './audio.js',
  './manifest.json',
  './icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all assets');
      // Use cache.addAll but handle failures gracefully
      return Promise.all(
        ASSETS.map((asset) => {
          return cache.add(asset).catch((err) => {
            console.warn(`[Service Worker] Failed to cache: ${asset}`, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        // Fallback for offline mode if file is not cached
        console.log('[Service Worker] Offline fetch failed for:', e.request.url);
      });
    })
  );
});
