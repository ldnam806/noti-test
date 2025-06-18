// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAWpqfh3lZqQ87m4icxn3T5pMdaJ3EcX9w',
  authDomain: 'test-notifire.firebaseapp.com',
  projectId: 'test-notifire',
  messagingSenderId: '31016841494',
  appId: '1:31016841494:web:60b0d459c700319101a037',
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
