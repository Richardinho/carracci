self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('carracci-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/reset.css',
        '/main.js',
        '/css/diagramMain.css',
        '/diagrams/builderPattern.json',
        '/diagrams/commandPattern.json',
        '/diagrams/decorator.json',
        '/diagrams/delegationPattern.json',
        '/diagrams/dom.json',
        '/bootstrap.js',
        '/main.js',
        '/lib/canvg-1.2/canvg.js',
        '/lib/canvg-1.2/rgbcolor.js',
        '/lib/eve.0.3.4.js',
        '/lib/jquery-1.8.0.js',
        '/lib/jscanvas.js',
        '/lib/jscanvastest.html',
        '/lib/raphael.2.1.0.amd.js',
        '/lib/raphael.2.1.0.core.js',
        '/lib/raphael.2.1.0.svg.js',
        '/lib/raphael.2.1.0.vml.js',
        '/lib/require.js',
        '/lib/underscore.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('carracci-v1').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});