self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('cache-name').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          './src/assets',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });