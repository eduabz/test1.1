import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCM7lu-yqddg68lBX665crXwEJMu0IO-u0",
  authDomain: "intellecta-858b9.firebaseapp.com",
  projectId: "intellecta-858b9",
  storageBucket: "intellecta-858b9.firebasestorage.app",
  messagingSenderId: "709279321647",
  appId: "1:709279321647:web:4721cae74963242a8400da",
  measurementId: "G-N8792QGHTN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
