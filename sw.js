importScripts('/serviceworker_examples/serviceworker-cache-polyfill.js');


self.addEventListener('install', function(event) {
  // pre cache a load of stuff:
  event.waitUntil(
    caches.open('myapp-static-v1').then(function(cache) {
      return cache.addAll([
        '/serviceworker_examples/',
        '/serviceworker_examples/bower_components/jquery/dist/jquery.min.js',
        '/serviceworker_examples/bower_components/bootstrap/dist/js/bootstrap.min.js'
      ]);
    })
  )
});

self.addEventListener('activate', function(event) {
  console.log("SW activated");
});

self.addEventListener('fetch', function(event) {
  //console.table(event.request)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

