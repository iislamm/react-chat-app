importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
  workbox.setConfig({debug: false})
  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    '/static',
    new workbox.strategies.NetworkFirst({
        fetchOptions: {
            credentials: 'include',
        },
    })
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}