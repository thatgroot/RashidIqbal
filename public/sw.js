const CACHE_NAME = 'rashid-iqbal-portfolio-v2';
const OFFLINE_URL = '/offline.html';

// Assets to cache immediately for offline use
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/favicon.svg',
  '/logo.svg',
  '/manifest.webmanifest',
  '/blog',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Cache offline page first
      await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
      // Then cache other assets
      await cache.addAll(PRECACHE_ASSETS);
    })()
  );
  // Activate immediately without waiting
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Clean old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
      // Enable navigation preload if supported
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - network-first with cache fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== self.location.origin) return;

  // Skip API routes
  if (url.pathname.startsWith('/api/')) return;

  // Handle navigation requests (HTML pages)
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          // Try navigation preload response first
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          // Try network
          const networkResponse = await fetch(request);
          
          // Cache the response for future use
          const cache = await caches.open(CACHE_NAME);
          cache.put(request, networkResponse.clone());
          
          return networkResponse;
        } catch (error) {
          // Network failed, try cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Return offline page
          const offlineResponse = await caches.match(OFFLINE_URL);
          return offlineResponse;
        }
      })()
    );
    return;
  }

  // Handle other requests (assets) - stale-while-revalidate
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match(request);

      // Return cached version immediately if available
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          // Update cache with new version
          if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        })
        .catch(() => {
          // Network failed, return cached or nothing
          return cachedResponse;
        });

      // Return cached response immediately, or wait for network
      return cachedResponse || fetchPromise;
    })()
  );
});

// Handle messages from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
