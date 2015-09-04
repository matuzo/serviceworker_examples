console.log("SW startup");

importScripts('serviceworker-cache-polyfill.js');


self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    cachesPolyfill.open('myapp-static-v1').then(function(cache) {
      return cache.addAll([
        '/'
      ]);
    })
  )
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  console.table(event.request)
  event.respondWith(
    cachesPolyfill.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

