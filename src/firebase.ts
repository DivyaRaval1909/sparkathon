import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCQoYJ9qYYClRDCeolunMMuf-EM5B1iI4s",
  authDomain: "log-in-eec02.firebaseapp.com",
  projectId: "log-in-eec02",
  storageBucket: "log-in-eec02.appspot.com",
  messagingSenderId: "297690039165",
  appId: "1:297690039165:web:32fe8dbb2beeca00fac214",
  measurementId: "G-XQ46V9FGNX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }; 