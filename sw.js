const CACHE = 'fitcoach-v80';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  // cache:'reload' evita que el navegador sirva una copia antigua al precachear
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(u =>
        fetch(new Request(u, { cache: 'reload' }))
          .then(r => r.ok ? c.put(u, r) : null)
          .catch(() => null)
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Permite que la página fuerce la activación inmediata de una versión nueva
self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  // El DOCUMENTO (index.html) va SIEMPRE a la red primero cuando hay conexión: así una versión
  // nueva se ve en cuanto está publicada. Sin red, se sirve la copia cacheada (offline sigue
  // funcionando igual). Antes era caché-primero, lo que podía dejar la app anclada a una
  // versión antigua indefinidamente aunque se hubiese publicado otra.
  const isDoc = e.request.mode === 'navigate' ||
                e.request.destination === 'document' ||
                url.pathname.endsWith('/') ||
                url.pathname.endsWith('index.html');

  if (isDoc) {
    e.respondWith(
      fetch(new Request(e.request, { cache: 'no-store' }))
        .then(resp => {
          if (resp && resp.ok) {
            const clone = resp.clone();
            caches.open(CACHE).then(c => c.put('./index.html', clone));
          }
          return resp;
        })
        .catch(() => caches.match('./index.html').then(c => c || caches.match('./')))
    );
    return;
  }

  // Resto de recursos (iconos, manifiesto): caché primero, que es lo adecuado y rápido.
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
