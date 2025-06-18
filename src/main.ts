import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'vue';
import App from './App.vue';
import routes from './router';
import './style.css';

registerSW({
  onNeedRefresh() {
    console.log('New content available. Please refresh.');
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  }
});





const app = createApp(App);

app.use(routes);
app.mount('#app');