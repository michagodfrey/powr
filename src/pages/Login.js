import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { db, auth, googleProvider, facebookProvider } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { TextField, Button } from "@mui/material"

const Login = () => {
  const [tab, setTab] = useState("login");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  const navigate = useNavigate();

  // toggle login and register tabs
  function updateTab(tab) {
    setTab(tab);
  }

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
          const ref = doc(db, "users", registerEmail);
          await setDoc(ref, {
            signInMethod: 'Email and password',
            email: registerEmail,
            routines: {},
            exercises: [],
            workoutsCount: 0,
            exercisesCount: 0,
            dateCreated: Timestamp.now().toDate().getTime(),
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } catch (error) {
      console.log(error.message);
    }
    navigate("/");
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch (error) {
      console.log(error.message);
    }
    navigate('/');
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;
        const ref = doc(db, "users", res.user.uid);

        await setDoc(ref, {
          signInMethod: 'Google',
          email: registerEmail,
          name: registerName,
          image: registerImage,
          routines: {},
          exercises: [],
          workoutsCount: 0,
          exercisesCount: 0,
          dateCreated: Timestamp.now().toDate().getTime(),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
      navigate("/");
  };

  const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const ref = doc(db, "users", res.user.uid);

        await setDoc(ref, {
          signInMethod: "Facebook",
          email: registerEmail,
          name: registerName,
          routines: {},
          exercises: [],
          workoutsCount: 0,
          exercisesCount: 0,
          dateCreated: Timestamp.now().toDate().getTime(),
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
      navigate("/");
  };

  // TODO: add alert
  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(`reset email sent to ${email}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
      navigate("/");
  };

  return (
    <>
      <main className="items-center flex flex-col grow min-h-[calc(100vh-192px)] max-w-4xl mx-auto dark:bg-black transition-colors bg-primaryHover">
        <h1 className="text-3xl mt-6 mb-10 text-center">Login and Join</h1>
        <div className="flex flex-col md:flex-row justify-around w-full max-w-sm md:max-w-4xl border">
          <div className="flex flex-col px-2 md:w-[360px] mb-6 border">
            <h2 className="text-2xl mb-4">Use external account</h2>
            <button
              onClick={signInWithGoogle}
              type="button"
              className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-4"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Continue with Google
            </button>
            <button
              onClick={signInWithFacebook}
              type="button"
              class="w-full text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <svg
                class="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="facebook-f"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                ></path>
              </svg>
              Continue with Facebook
            </button>
          </div>

          <div className="text-2xl text-center mb-6">Or</div>

          <div className="md:w-[360px]">
            <h2 className="text-2xl mb-4">Login in with email</h2>
            <div className="flex border">
              <div onClick={() => updateTab("login")} className="mx-4 border">
                Login
              </div>
              <div onClick={() => updateTab("join")} className="mx-4 border">
                Join
              </div>
            </div>
            {tab === "login" ? (
              <div className="border flex flex-col text-2xl">
                <TextField
                  onChange={(event) => {
                    setLoginEmail(event.target.value);
                  }}
                  id="loginEmail"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                  id="loginPassword"
                  label="Password"
                  variant="outlined"
                  type="password"
                  autoComplete="current-password"
                />
                <Button onClick={login} variant="contained">
                  Login
                </Button>
                <button class="text-white w-full bg-primary hover:bg-primary/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                  Dummy Login
                </button>
                <TextField
                  onChange={(event) => {
                    setResetEmail(event.target.value);
                  }}
                  id="resetnEmail"
                  label="Email"
                  variant="outlined"
                />
                <Button
                  onClick={() => resetPassword(resetEmail)}
                  variant="contained"
                >
                  Reset Password
                </Button>
              </div>
            ) : (
              <div className="border flex flex-col text-2xl">
                <p className="text-center">Sign up with email</p>
                <TextField
                  onChange={(event) => {
                    setRegisterEmail(event.target.value);
                  }}
                  id="registerEmail"
                  label="Email"
                  variant="outlined"
                />
                <TextField
                  onChange={(event) => {
                    setRegisterPassword(event.target.value);
                  }}
                  id="registerPassword"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
                <TextField
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  id="repeatPassword"
                  label="Repeat password"
                  variant="outlined"
                  type="password"
                />
                <Button onClick={register} variant="contained">
                  Join
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Login