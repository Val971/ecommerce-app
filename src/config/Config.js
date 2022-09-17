import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from '@firebase/firestore'
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBVX_WBRKbLpWmW8caJKcuWcb9XegTbgxE",
  authDomain: "ecommerce-001-40091.firebaseapp.com",
  projectId: "ecommerce-001-40091",
  storageBucket: "ecommerce-001-40091.appspot.com",
  messagingSenderId: "358778790550",
  appId: "1:358778790550:web:9e24fd59b91e4d9fae18b7",
  measurementId: "G-Z2NH3HPRKM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db =  getFirestore(app);
export const storage = getStorage(app);
export default app;
