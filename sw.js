/**
 * Service Worker — runtime cache, so a learner who has opened a lesson once
 * can reopen it with a slow/offline connection (e.g. studying on the way to
 * school). Deliberately has no hardcoded asset list: this project's lesson
 * folders use Arabic names and can be deployed under any base path, so a
 * precache manifest would be fragile. Instead every same-origin GET request
 * is cached the first time it's actually used, then served from cache first.
 */

const CACHE_NAME = 'biology-3sec-cache-v3';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  const isNavigation =
    req.mode === 'navigate' ||
    (req.headers.get('accept') || '').includes('text/html');

  // HTML pages: try the network first (so lesson edits show up immediately),
  // fall back to whatever was cached last time if the network is unavailable.
  if (isNavigation) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // Everything else (CSS/JS/JSON/images/fonts): cache-first for speed and
  // offline resilience, refreshing the cache in the background from network.
  event.respondWith(
    caches.match(req).then((cached) => {
      const networkFetch = fetch(req)
        .then((res) => {
          if (isSameOrigin && res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
