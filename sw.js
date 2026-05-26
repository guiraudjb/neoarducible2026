const CACHE_NAME = 'arducible-v2';
const ASSETS = [
    './index.html',
    './manifest.json'
];

// Installation : Mise en cache des ressources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

// Récupération : Servir depuis le cache
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
