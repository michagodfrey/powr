import React from 'react';
import { Link } from "react-router-dom";

const Dropdown = ({ dropdownOpen, logout, user }) => {

  return (
    <aside className={`${dropdownOpen ? "flex" : "hidden"} flex-col absolute right-4 top-24 bg-white text-textColor p-4 shadow-lg`}>
      {user ? (
        <>
          <Link to="/">Workouts</Link>
          <Link to="/account">Account</Link>
          <hr></hr>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <Link to="/login">Login/Join</Link>
      )}
    </aside>
  );
}

export default Dropdown