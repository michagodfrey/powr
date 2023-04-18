import {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import {db, auth, googleProvider, facebookProvider} from "./firebase-config";
import {doc, setDoc} from "firebase/firestore";

import UserDisplay from "./pages/UserDisplay";
import Home from "./pages/Home";
import Faq from "./pages/Faq";
import Account from "./pages/Account";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  // dark mode - applied to main
  // const [darkMode, setDarkMode] = useState("light");

  // useEffect(() => {
  //   if (darkMode === 'dark') {
  //     document.documentElement.classList.add('dark')
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //   }
  // }, [darkMode]);

  // useEffect(() => {
  //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     setDarkMode('dark');
  //   } else {
  //     setDarkMode('light');
  //   }
  //   console.log('preferred mode set')
  // }, [])

  // const toggleDarkMode = () => {
  //   setDarkMode(darkMode === "dark" ? "light" : "dark");
  // }


  // display current user data
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);


  // auth functions
  const register = async () => {
    try {
      if (registerPassword !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )
        .then(async (res) => {
          const ref = doc(db, "users", res.user.uid);
          await setDoc(ref, {
            email: registerEmail,
            routines: {}
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;
        const ref = doc(db, "users", res.user.uid);

        await setDoc(ref, {
          email: registerEmail,
          name: registerName,
          image: registerImage,
          routines: {}
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
    .then(async (res) => {
      const registerName = res.user.displayName;
      const registerEmail = res.user.email;
      const ref = doc(db, "users", res.user.uid);

      await setDoc(ref, {
        email: registerEmail,
        name: registerName,
      });
    })
    .catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <div className="box-border text-textColor font-mono">
      <BrowserRouter>
        <Routes>
          <Route
              path="/"
              element={user ? <UserDisplay user={user} /> : <Home />}
            />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <Login
                setRegisterEmail={setRegisterEmail}
                setRegisterPassword={setRegisterPassword}
                setConfirmPassword={setConfirmPassword}
                setLoginEmail={setLoginEmail}
                setLoginPassword={setLoginPassword}
                register={register}
                login={login}
                signInWithGoogle={signInWithGoogle}
                signInWithFacebook={signInWithFacebook}
              />
            }
          />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
