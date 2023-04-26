import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJIfkdM5ifRQClz51ZQB_Vq_FZUc4J0PI",
  authDomain: "powr-app.firebaseapp.com",
  projectId: "powr-app",
  storageBucket: "powr-app.appspot.com",
  messagingSenderId: "279462328654",
  appId: "1:279462328654:web:b40be8b79173142760c61f",
  measurementId: "G-VJKNRBGBCK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const db = getFirestore();

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;

        localStorage.setItem("name", registerName);
        localStorage.setItem("email", registerEmail);
        localStorage.setItem("image", registerImage);

        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
          await setDoc(docRef, {
            email: registerEmail,
            name: registerName,
            image: registerImage,
            routines: {},
            exercises: [],
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
};

export const logout = async () => {
  await signOut(auth);
};