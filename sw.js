const CACHE_NAME = 'arducible-v8';
const ASSETS = [
    './index.html',
    './jeu1.html',
    './jeu2.html',
    './jeu3.html',
    './manifest.json',
    './img/Arducible.png'
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
