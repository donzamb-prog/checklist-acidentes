const CACHE_NAME = 'checklist-acidentes-gh-v1';

const ASSETS = [
  '/checklist-acidentes/',
  '/checklist-acidentes/index.html',
  '/checklist-acidentes/manifest.json',
  '/checklist-acidentes/service-worker.js',
  '/checklist-acidentes/icons/icon-192.png',
  '/checklist-acidentes/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});

