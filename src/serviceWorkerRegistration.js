const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127\.(?:\d{1,3}\.){2}\d{1,3}$/
    )
  );
  export function register() {
    if ('serviceWorker' in navigator) {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
      } else {
        registerValidSW(swUrl);
      }
    }
  }
  function registerValidSW(swUrl) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
  function checkValidServiceWorker(swUrl) {
    return fetch(swUrl)
      .then((response) => {
        if (response.status === 404 || !response.headers.get('content-type').includes('javascript')) {
          navigator.serviceWorker.ready
            .then((registration) => registration.unregister())
            .catch((error) => console.error('Error during service worker unregistration:', error));
        } else {
          registerValidSW(swUrl);
        }
      })
      .catch((error) => {
        console.error('Error fetching the service worker:', error);
        console.log('App is running in offline mode.');
      });
  }
  