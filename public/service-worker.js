// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    // Код для кеширования ресурсов
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    console.log('Fetching:', event.request.url);
    // Обработка запросов, например, кеширование
});