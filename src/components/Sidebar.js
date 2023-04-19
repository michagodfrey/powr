import React from "react";
import { Link } from "react-router-dom";
import userIcon from "../images/user-svgrepo-com.svg";

const Sidebar = ({ sidebarOpen, toggleSidebar, logout, user }) => {
  
  return (
    <aside
      className={`${
        sidebarOpen ? "flex" : "hidden"
      } flex-col absolute right-0 top-0 h-screen bg-primary md:hidden`}
    >
      <button onClick={toggleSidebar}>Close</button>
      <Link to="/">Home</Link>
      <Link to="/faq">FAQ</Link>
      <Link to="/contact">Contact</Link>
      {user && (
        <>
          <img src={userIcon} alt="user icon" />
          <Link to="/">Workouts</Link>
          <Link to="/account">Account</Link>
        </>
      )}
      <hr></hr>
      {user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <Link to="/login">Login/Join</Link>
      )}
    </aside>
  );
};

export default Sidebar;
