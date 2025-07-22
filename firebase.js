import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAlZcPCzMsVLfqpnXwrLezQ9PjzlUjJWWw",
  authDomain: "productivityapp-f5019.firebaseapp.com",
  projectId: "productivityapp-f5019",
  storageBucket: "productivityapp-f5019.firebasestorage.app",
  messagingSenderId: "617589264799",
  appId: "1:617589264799:web:50e9aee55d67f0ac1eadaa",
  measurementId: "G-8Q1JS2DSTL"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const db = getFirestore(app);

export { auth, db };