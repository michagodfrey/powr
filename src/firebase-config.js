import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJIfkdM5ifRQClz51ZQB_Vq_FZUc4J0PI",
  authDomain: "powr-app.firebaseapp.com",
  projectId: "powr-app",
  storageBucket: "powr-app.appspot.com",
  messagingSenderId: "279462328654",
  appId: "1:279462328654:web:b40be8b79173142760c61f",
  measurementId: "G-VJKNRBGBCK",
};

initializeApp(firebaseConfig);

export const auth = getAuth()

export const db = getFirestore();

export const googleProvider = new GoogleAuthProvider();

export const facebookProvider = new FacebookAuthProvider();