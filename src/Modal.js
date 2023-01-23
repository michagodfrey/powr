import React from 'react';

const Modal = ({
  isModalOpen,
  closeModal,
  setRegisterEmail,
  setRegisterPassword,
  register,
  setLoginEmail,
  setLoginPassword,
  login,
}) => {
  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-tab">
          <input
            className="radio"
            id="tab1"
            name="modal-tab"
            type="radio"
            checked
          />
          <label for="tab1">Log in</label>
          <div className="modal-content">
            <button
              className="login-with-google-btn"
              // onClick={signInWithGoogle}
            >
              Continue with Google
            </button>
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
          </div>
        </div>
        <div className="modal-tab">
          <input className="radio" id="tab2" name="modal-tab" type="radio" />
          <label for="tab2">Sign up</label>
          <div className="modal-content">
            <button
              className="login-with-google-btn"
              // onClick={signInWithGoogle}
            >
              Continue with Google
            </button>
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
            <input
              type="password"
              placeholder="confirm password"
            />
            <button onClick={register}>Sign up</button>
          </div>
        </div>

        <button className="close-modal-btn" onClick={closeModal}>
          close
        </button>
      </div>
    </div>
  );
};

export default Modal