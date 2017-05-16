var cacheName = 'thrPWA-1';
var dataCacheName = 'weatherData-v1';
var filesToCache = [
	'/',
	'/public/images/well.png'
];

self.addEventListener('install', function(e){
	console.log('[Service Worker Installe]');
	e.waitUntil(
	    caches.open(cacheName).then(function(cache) {
	      console.log('[ServiceWorker] Caching app shell');
	      return cache.addAll(filesToCache);
	    })
  	);
});