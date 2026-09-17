// Service Worker for Le Green IT en clair
// Enables offline-first functionality

const CACHE_NAME = 'green-it-v1.3.7';
const STATIC_ASSETS = [
    '/greenit/',
    '/greenit/offline/',
    '/greenit/comprendre/',
    '/greenit/chiffres/',
    '/greenit/agir/',
    '/greenit/outils/',
    '/greenit/faq/',
    '/greenit/fiches-pratiques/',
    '/greenit/fiches-pratiques/gestes-quotidiens/',
    '/greenit/fiches-pratiques/achat-responsable/',
    '/greenit/fiches-pratiques/ecoconception-web/',
    '/greenit/fiches-pratiques/reparer-prolonger/',
    '/greenit/fiches-pratiques/green-it-entreprise/',
    '/greenit/fiches-pratiques/recyclage-mode-emploi/',
    '/greenit/fiches-pratiques/datacenters-verts/',
    '/greenit/fiches-pratiques/collectivites-action/',
    '/greenit/fiches-pratiques/ia-generative/',
    '/greenit/fiches-pratiques/streaming-video/',
    '/greenit/fiches-pratiques/teletravail-visio/',
    '/greenit/fiches-pratiques/emails-cloud/',
    '/greenit/fiches-pratiques/objets-connectes/',
    '/greenit/fiches-pratiques/impression-papier/',
    '/greenit/fiches-pratiques/enfants-ecole/',
    '/greenit/fiches-pratiques/box-wifi/',
    '/greenit/blog/',
    '/greenit/blog/premier-audit-green-it-pme/',
    '/greenit/blog/reconditionne-vs-neuf-le-calcul/',
    '/greenit/blog/comprendre-le-pue-en-5-minutes/',
    '/greenit/blog/agec-reen-ce-qui-change/',
    '/greenit/blog/un-an-avec-un-smartphone-reparable/',
    '/greenit/blog/back-market-portrait-reconditionne/',
    '/greenit/blog/que-consomme-vraiment-votre-box/',
    '/greenit/blog/fairphone-portrait-telephone-equitable/',
    '/greenit/blog/envie-portrait-reemploi-solidaire/',
    '/greenit/modeles/',
    '/greenit/modeles/cahier-charges-achat/',
    '/greenit/modeles/charte-green-it/',
    '/greenit/modeles/grille-audit/',
    '/greenit/modeles/guide-sensibilisation/',
    '/greenit/modeles/plan-action-dsi/',
    '/greenit/modeles/politique-numerique/',
    '/greenit/modeles/tableau-bord-impact/',
    '/greenit/manifest.json',
    '/greenit/icon-light-32x32.webp',
    '/greenit/apple-icon.webp',
    '/greenit/icon-192.webp',
    '/greenit/icon-512.webp',
    '/greenit/icon-512-maskable.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Caching static assets');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => {
                        console.log('[SW] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') return;

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) return;

    // Navigations (pages HTML) : network-first.
    // Sinon, après un déploiement, les visiteurs garderaient l'ancien HTML
    // qui pointe vers des fichiers JS renommés (hash) -> 404, site cassé.
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response && response.status === 200) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                }
                return response;
            }).catch(() => {
                return caches.match(event.request).then((cached) => cached || caches.match('/greenit/offline/') || caches.match('/greenit/'));
            })
        );
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // Return cached version
                return cachedResponse;
            }

            // Fetch from network and cache
            return fetch(event.request).then((response) => {
                // Don't cache non-successful responses
                if (!response || response.status !== 200) {
                    return response;
                }

                // Ne jamais mettre en cache du HTML sous une URL de script/style :
                // un fallback serveur (index.html, 404) empoisonnerait le cache
                // et casserait la mise en page (erreurs « Unexpected token '<' »).
                const dest = event.request.destination;
                if (dest === 'script' || dest === 'style') {
                    const ct = response.headers.get('content-type') || '';
                    if (!/(javascript|css)/.test(ct)) {
                        return response;
                    }
                }

                // Clone response for caching
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return response;
            }).catch(() => {
                // Offline fallback for HTML pages
                if (event.request.headers.get('accept')?.includes('text/html')) {
                    return caches.match('/greenit/offline/') || caches.match('/greenit/');
                }
            });
        })
    );
});
