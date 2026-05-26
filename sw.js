const CACHE_NAME = 'arducible-v10';
const ASSETS = [
    './index.html',
    './jeu1.html',
    './jeu2.html',
    './jeu3.html',
    './jeu4.html',
    './jeu5.html', 
    './manifest.json',
    './img/Arducible.png'
];

// Installation : mise en cache + prise de contrôle immédiate
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting(); // active immédiatement sans attendre la fermeture des anciens onglets
});

// Activation : purge tous les anciens caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        )
    );
    self.clients.claim(); // prend le contrôle de tous les onglets ouverts immédiatement
});

// Récupération : cache en priorité, réseau en fallback
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});
