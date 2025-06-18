<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMessage } from 'firebase/messaging';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { messaging } from './firebase/messaging';
import { setupFCM } from './setupFCM';



    // 🔐 Setup FCM
  setupFCM();

  // 🟡 Foreground FCM handling
  onMessage(messaging, (payload) => {
    console.log('[🔥 Foreground FCM]', payload);
    const title = payload.notification?.title || 'New Notification';
    const options = {
      body: payload.notification?.body || '',
      icon: payload.notification?.icon || '/icons/icon-192x192.png',
      data: {
        url: payload.data?.url || '/do-quiz',
      },
    };

    if (Notification.permission === 'granted') {
      console.log('[🟡 Foreground FCM handling]');
      const n = new Notification(title, options);
      n.onclick = () => {
        window.focus();
        if (options.data.url) {
          window.location.replace(options.data.url);
        }
      };
    }
  });

onMounted(() => {
  const router = useRouter();

  // Read redirect from URL param (when tab is opened from SW)
  const params = new URLSearchParams(window.location.search);
  const redirect = params.get('redirect');
  if (redirect) {
    router.push(redirect);
  }

  // Also listen for postMessage
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', event => {
      const { type, url } = event.data || {};
      if (type === 'set_redirect_flag' && url) {
        router.push(url);
      }
    });
  }
});
</script>
