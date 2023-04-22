import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Sidebar from "./Sidebar";
import Dropdown from "./Dropdown";

const Header = ({ user }) => {

  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate('/')
  };
  
  return (
    <header className="bg-secondary text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/">
          <img
            className="max-h-16"
            src={require("../images/powr-logo-noBG.webp")}
            alt="POWR logo"
          />
        </Link>
        <nav className="hidden md:block">
          <Link to="/" className="mx-4">
            Home
          </Link>
          <Link to="/faq" className="mx-4">
            FAQ
          </Link>
          <Link to="/contact" className="mx-4">
            Contact
          </Link>
        </nav>
      </div>

      <div className="hidden md:block">
        <Dropdown logout={logout} user={user} />
      </div>

      <div className="md:hidden">
        <Sidebar logout={logout} user={user} />
      </div>
    </header>
  );
};

export default Header;
