import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD7Dq97fv4WMqftg18wHF1M-FnHstSc0MY",
  authDomain: "reactmobile5a.firebaseapp.com",
  projectId: "reactmobile5a",
  storageBucket: "reactmobile5a.appspot.com",
  messagingSenderId: "431176009518",
  appId: "1:431176009518:web:8b6725f2547dda1d9c5cbf"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage};