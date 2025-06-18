// messaging.ts or firebase.ts

import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAWpqfh3lZqQ87m4icxn3T5pMdaJ3EcX9w',
  authDomain: 'test-notifire.firebaseapp.com',
  projectId: 'test-notifire',
  storageBucket: 'test-notifire.firebasestorage.app',
  messagingSenderId: '31016841494',
  appId: '1:31016841494:web:60b0d459c700319101a037',
  measurementId: 'G-Y1847FLLGX',
};

const app = initializeApp(firebaseConfig);

// ⚠️ messaging must be exported
export const messaging = getMessaging(app);
