import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCVFHDNVvS0F1eUX3olqkbezcYswFFcKJ4",
  authDomain: "steagg-5bcff.firebaseapp.com",
  projectId: "steagg-5bcff",
  storageBucket: "steagg-5bcff.firebasestorage.app",
  messagingSenderId: "909052251423",
  appId: "1:909052251423:web:7552b44ab462bb8139742a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
