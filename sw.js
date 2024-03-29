let version = 'carracci-v5'

/*
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/carracci/',
        '/carracci/main.js',
        '/carracci/css/diagramMain.css',
        '/carracci/diagrams/builderPattern.json',
        '/carracci/diagrams/commandPattern.json',
        '/carracci/diagrams/decorator.json',
        '/carracci/diagrams/delegationPattern.json',
        '/carracci/diagrams/dom.json',
        '/carracci/bootstrap.js',
        '/carracci/main.js',
        '/carracci/lib/canvg-1.2/canvg.js',
        '/carracci/lib/canvg-1.2/rgbcolor.js',
        '/carracci/lib/eve.0.3.4.js',
        '/carracci/lib/jquery-1.8.0.js',
        '/carracci/lib/jscanvas.js',
        '/carracci/lib/jscanvastest.html',
        '/carracci/lib/raphael.2.1.0.amd.js',
        '/carracci/lib/raphael.2.1.0.core.js',
        '/carracci/lib/raphael.2.1.0.svg.js',
        '/carracci/lib/raphael.2.1.0.vml.js',
        '/carracci/lib/require.js',
        '/carracci/lib/underscore.js',
      ])
    })
  )
})
*/

/*
 * serve from cache or fetch across network
 * and store update in cache
 */

self.addEventListener('fetch', function(event) {
  console.log('fetch from service worker')
  event.respondWith(
    caches.open(version).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        return (
          response ||
          fetch(event.request).then(function(response) {
            console.log('fetching', event.request, 'across network')
            cache.put(event.request, response.clone())
            return response
          })
        )
      })
    })
  )
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName !== version
          })
          .map(function(cacheName) {
            return caches.delete(cacheName)
          })
      )
    })
  )
})
