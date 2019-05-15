var CACHE_NAME = 'NB-Static-Cache-v1';
var urlsToCache = [
    '/',
  '/index.html',
  'popper.min.js',
  '/bootstrap.min.css',
  '/jquery3.2.1.min.js',
  '/bootstrap.min.js',
  '/style.css',
  '/NewsScript.js'
];


self.addEventListener('install', function(event) {
event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
            caches.match(event.request)
              .then(function(response) {
                if (response) {
                  return response;
                }
                return fetch(event.request);
              }
            )
          );
});

self.addEventListener('activate', function(event) {
console.log('activate event is called');
});