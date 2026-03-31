// ═══════════════════════════════════════════════════════════
// MA.GI.CA Enterprise PWA — Service Worker v4
// Cache strategies: Cache-First, Network-First, SWR, Network-Only
// Features: Background Sync, Push Notifications, Offline Fallback
// ═══════════════════════════════════════════════════════════

const CACHE_NAME = 'magica-pwa-v5';
const STATIC_CACHE = 'magica-static-v5';
const PAGES_CACHE = 'magica-pages-v5';
const RUNTIME_CACHE = 'magica-runtime-v5';

// ── Assets to pre-cache on install ──
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/hero.png',
  '/images/standard-hero.png',
  '/images/pro-hero.png',
  '/images/executive-hero.png',
];

// ── INSTALL ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE — clean old caches ──
self.addEventListener('activate', (event) => {
  const currentCaches = [STATIC_CACHE, PAGES_CACHE, RUNTIME_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !currentCaches.includes(name))
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// ── FETCH — route to correct strategy ──
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests (POST/PUT/DELETE go to network)
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s)
  if (!url.protocol.startsWith('http')) return;

  // 1) API routes → Network-Only (never cache)
  if (url.pathname.startsWith('/api/')) {
    return; // Let the browser handle it normally
  }

  // 2) Static assets (icons, favicons, manifest) → Cache-First
  if (isStaticAsset(url.pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // 3) Next.js build chunks & static assets → Stale-While-Revalidate
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/_next/image/')) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  // 4) HTML pages → Network-First with offline fallback
  if (request.headers.get('accept')?.includes('text/html') || isPageRoute(url.pathname)) {
    event.respondWith(networkFirstWithOffline(request, PAGES_CACHE));
    return;
  }

  // 5) Everything else → Stale-While-Revalidate
  event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
});

// ── BACKGROUND SYNC ──
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-projects') {
    event.waitUntil(syncPendingProjects());
  }
});

// ── PUSH NOTIFICATIONS ──
self.addEventListener('push', (event) => {
  let data = { title: 'MA.GI.CA', body: 'Nová aktualizácia!' };

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'MA.GI.CA', {
      body: data.body || 'Nová aktualizácia!',
      icon: '/icons/icon-192x192.png',
      badge: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: { url: data.url || '/admin' },
      actions: [
        { action: 'open', title: 'Otvoriť' },
        { action: 'dismiss', title: 'Zatvoriť' },
      ],
    })
  );
});

// ── NOTIFICATION CLICK ──
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'dismiss') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      // Focus existing window if available
      for (const client of clients) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      return self.clients.openWindow(targetUrl);
    })
  );
});

// ═══════════════════════════════════════════════════════════
// CACHE STRATEGY HELPERS
// ═══════════════════════════════════════════════════════════

/** Cache-First: return cached response, fallback to network */
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/** Network-First with offline fallback page */
async function networkFirstWithOffline(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    // Try cache
    const cached = await caches.match(request);
    if (cached) return cached;

    // Fallback to offline page
    const offlinePage = await caches.match('/offline');
    if (offlinePage) return offlinePage;

    return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

/** Stale-While-Revalidate: return cached immediately, update in background */
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// ═══════════════════════════════════════════════════════════
// BACKGROUND SYNC — Flush IndexedDB queue
// ═══════════════════════════════════════════════════════════

async function syncPendingProjects() {
  try {
    const db = await openSyncDB();
    const tx = db.transaction('pending-projects', 'readonly');
    const store = tx.objectStore('pending-projects');
    const allItems = await idbGetAll(store);

    for (const item of allItems) {
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.project),
        });

        if (res.ok) {
          // Remove synced item
          const deleteTx = db.transaction('pending-projects', 'readwrite');
          deleteTx.objectStore('pending-projects').delete(item.id);
        }
      } catch {
        // Will retry on next sync
      }
    }
    db.close();
  } catch {
    // IndexedDB not available or empty
  }
}

function openSyncDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('magica-sync-v1', 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('pending-projects')) {
        db.createObjectStore('pending-projects', { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbGetAll(store) {
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ═══════════════════════════════════════════════════════════
// ROUTE MATCHERS
// ═══════════════════════════════════════════════════════════

function isStaticAsset(pathname) {
  return (
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/favicon') ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/manifest.json' ||
    pathname === '/hero.png' ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.ico')
  );
}

function isPageRoute(pathname) {
  const pages = ['/', '/admin', '/offline', '/pro', '/executive', '/standard'];
  return pages.includes(pathname) || pathname === '';
}
