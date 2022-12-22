import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-config";

const Modal = ({ 
    isModalOpen, 
    closeModal
    // setRegisterEmail,
    // setRegisterPassword,
    // register
}) => {

    //  const [registerEmail, setRegisterEmail] = useState("");
    //  const [registerPassword, setRegisterPassword] = useState("");

    return (
      <div
        className={`${
          isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="modal-container">
          {/* <form>
            <p>Register</p>
            <input
              type="email"
              placeholder="email"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
            />
            <input
              placeholder="password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
            />
            <button onClick={register}>Sign up</button>
            <p>Sign in</p>
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
            <button onClick={login}>Login</button>
          </form> */}
          <button className="close-modal-btn" onClick={closeModal}>
            close
          </button>
        </div>
      </div>
    );
}

export default Modal