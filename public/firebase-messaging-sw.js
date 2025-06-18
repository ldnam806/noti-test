importScripts(
  "https://www.gstatic.com/firebasejs/11.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.8.0/firebase-messaging-compat.js"
);
importScripts("/firebase-config.js");

firebase.initializeApp({
  apiKey: 'AIzaSyAWpqfh3lZqQ87m4icxn3T5pMdaJ3EcX9w',
  authDomain: 'test-notifire.firebaseapp.com',
  projectId: 'test-notifire',
  storageBucket: 'test-notifire.firebasestorage.app',
  messagingSenderId: '31016841494',
  appId: '1:31016841494:web:60b0d459c700319101a037',
  measurementId: 'G-Y1847FLLGX',
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification click event:", event);
  event.notification.close();
  const targetUrl = "/do-quiz";
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes(self.location.origin)) {
            client.focus();
            client.postMessage({ type: "set_redirect_flag", url: targetUrl });
            return;
          }
        }
        console.log(
          "Trying to open:",
          `${self.location.origin}/?redirect=${encodeURIComponent(targetUrl)}`
        );
        // Open new window if no client matches
        return clients.openWindow(
          `${self.location.origin}/?redirect=${encodeURIComponent(targetUrl)}`
        );
      })
  );
});
