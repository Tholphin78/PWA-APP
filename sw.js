self.addEventListener('install', event => {
    console.log('Service Worker zainstalowany');
});

self.addEventListener('fetch', event => {
    console.log('Pobieranie:', event.request.url);
});
