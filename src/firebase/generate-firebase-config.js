const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
  apiKey: 'AIzaSyAWpqfh3lZqQ87m4icxn3T5pMdaJ3EcX9w',
  authDomain: 'test-notifire.firebaseapp.com',
  projectId: 'test-notifire',
  storageBucket: 'test-notifire.firebasestorage.app',
  messagingSenderId: '31016841494',
  appId: '1:31016841494:web:60b0d459c700319101a037',
  measurementId: 'G-Y1847FLLGX',
};

const output = `const firebaseConfig = ${JSON.stringify(config, null, 2)};`;

fs.writeFileSync(
  path.join(__dirname, '../public/firebase-config.js'),
  output,
  'utf8'
);

console.log('✅ firebase-config.js generated!');