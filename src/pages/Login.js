import React, { useState } from 'react';
import { auth} from "../firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = ({
  setRegisterEmail,
  setRegisterPassword,
  setConfirmPassword,
  setLoginEmail,
  setLoginPassword,
  register,
  login,
  signInWithGoogle,
  signInWithFacebook,
}) => {

  const [tab, setTab] = useState('login');
  const [resetEmail, setResetEmail] = useState("");

  function updateTab(tab) {
    setTab(tab);
  }

  // add alert
  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log(`reset email sent to ${email}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <Header />
      <main className="items-center flex flex-col grow min-h-[calc(100vh-192px)] bg-white dark:bg-black transition-colors">
        <h1>Login and Join</h1>
        <div className="flex">
          <div onClick={() => updateTab("login")} className="mx-4 border">
            Login
          </div>
          <div onClick={() => updateTab("join")} className="mx-4 border">
            Join
          </div>
        </div>
        {tab === "login" ? (
          <div className="border flex flex-col text-2xl">
            <button
              className="bg-[#3B5998] hover:bg-[#627aad] text-white flex items-center p-4 my-2 rounded"
              onClick={signInWithFacebook}
            >
              <img
                src="../images/facebook-svgrepo-com.svg"
                alt="facebook logo"
                className="mr-4"
              />
              Continue with Facebook
            </button>
            <button
              className="bg-[#DD4B39] hover:bg-[#e46f61] text-white flex items-center p-4 my-2 rounded"
              onClick={signInWithGoogle}
            >
              <img
                src="../images/google-svgrepo-com.svg"
                alt="google logo"
                className="mr-4"
              />
              Continue with Google
            </button>
            <p className="text-center">Login in with email</p>
            <input
              type="email"
              placeholder="email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
            <button className="" onClick={login}>
              Login
            </button>
            <input id="pw-reset" type="checkbox" />
            <label htmlFor="pw-reset" className="">
              Forgot your password?
            </label>
            <div
              id="reset"
              className="modal-pw-reset"
              onChange={(event) => {
                setResetEmail(event.target.value);
              }}
            >
              <input type="email" placeholder="email" />
              <button onClick={() => resetPassword(resetEmail)}>Go</button>
            </div>
          </div>
        ) : (
          <div className="border flex flex-col text-2xl">
            <button
              className="bg-[#3B5998] hover:bg-[#627aad] text-white flex items-center p-4 my-2 rounded"
              onClick={signInWithFacebook}
            >
              <img
                src="../images/facebook-svgrepo-com.svg"
                alt="facebook logo"
                className="mr-4"
              />
              Continue with Facebook
            </button>
            <button
              className="bg-[#DD4B39] hover:bg-[#e46f61] text-white flex items-center p-4 my-2 rounded"
              onClick={signInWithGoogle}
            >
              <img
                src="../images/google-svgrepo-com.svg"
                alt="google logo"
                className="mr-4"
              />
              Continue with Google
            </button>
            <p className="text-center">Sign up with email</p>
            <input
              type="email"
              placeholder="email"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="password"
              autoComplete="new-password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="confirm password"
              autoComplete="new-password"
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <button className="" onClick={register}>
              Sign up
            </button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Login