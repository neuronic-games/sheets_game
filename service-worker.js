///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change the version name to tak effect whenever the new version released
var CACHE_NAME = 'zSheets-Games-v3';
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1 - Install
// Here we wait for an InstallEvent to fire, then tell the cache which URLs it should retrieve and cache
self.addEventListener('install', event => {
   event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
           return cache.addAll([
               './',
               './index.html',
               './js-package/ServiceWorkerUpdateListener.min.js',
           ]);
        })
   );
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2 - Activate
// Here we wait for an ActivateEvent to fire, then we remove any old cache. That is to say, any cache stored
// that does not have the same key as the one we defined in CACHE_NAME
self.addEventListener('activate', event => {
   event.waitUntil(
       caches.keys().then(cacheNames => {
           return Promise.all(
               cacheNames.map(cacheName => {
                //console.log(cacheName, " !== ", CACHE_NAME)
                   if (cacheName !== CACHE_NAME)
                   return caches.delete(cacheName);
               })
           );
       })
   );
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3 - Fetch
// Anytime our website requests a new resource we first check the cache if we have anything available already
// and if so, just use that. If not, we retrieve the resource and put it in cache for the next time we may need it.
//self.addEventListener('fetch', event => {
    //console.log(event)
    /* event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) return response;
            return fetch(event.request)
            .then(response => {
                if (!response || response.status !== 200 || response.type !== 'basic') return response;
                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache)
                });
            });
        })
    ) */
//});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 4 - Message
// Here we wait for a MessageEvent to fire, if the message contains skipWaiting we should execute that method.
self.addEventListener('message', event => {
    //console.log(event.data, " >>>")
   if (event.data === 'skipWaiting') return skipWaiting();
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

