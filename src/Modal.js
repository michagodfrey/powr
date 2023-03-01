import React, {useState} from "react";
import {FaFacebookF, FaGoogle, FaTimes} from "react-icons/fa";

// Modal used for login/sign up, working as of last commit
const Modal = ({
  isModalOpen,
  closeModal,
  setRegisterEmail,
  setRegisterPassword,
  register,
  setLoginEmail,
  setLoginPassword,
  login,
  signInWithGoogle,
  signInWithFacebook,
  resetPassword,
}) => {
  const [resetEmail, setResetEmail] = useState("");

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div
        className={`modal-container ${
          isModalOpen ? "slide-in-top" : "slide-out-top"
        }`}
      >
        <div className="modal-tab">
          <input
            className="radio"
            id="tab1"
            name="modal-tab"
            type="radio"
            defaultChecked
          />
          <label htmlFor="tab1" className="label-radio">
            Log in
          </label>
          <div className="modal-content">
            <button
              className="ex-auth-btn facebook"
              onClick={signInWithFacebook}
            >
              <FaFacebookF />
              Continue with Facebook
            </button>
            <button className="ex-auth-btn google" onClick={signInWithGoogle}>
              <FaGoogle />
              Continue with Google
            </button>
            <p>Login in with email</p>
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
            <button className="sign-log-btn" onClick={login}>
              Login
            </button>
            <input id="pw-reset" type="checkbox" />
            <label htmlFor="pw-reset" className="label-checkbox">
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
        </div>
        <div className="modal-tab">
          <input className="radio" id="tab2" name="modal-tab" type="radio" />
          <label htmlFor="tab2" className="label-radio">
            Sign up
          </label>
          <div className="modal-content">
            <button
              className="ex-auth-btn facebook"
              onClick={signInWithFacebook}
            >
              <FaFacebookF />
              Continue with Facebook
            </button>
            <button className="ex-auth-btn google" onClick={signInWithGoogle}>
              <FaGoogle />
              Continue with Google
            </button>
            <p>Sign up with email</p>
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
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <input type="password" placeholder="confirm password" />
            <button className="sign-log-btn" onClick={register}>
              Sign up
            </button>
          </div>
        </div>
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default Modal;
