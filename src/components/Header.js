import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Sidebar from "./Sidebar";
import Dropdown from "./Dropdown";
import HamburgerIcon from "../images/hamburger-menu-svgrepo-com.svg";

const Header = ({ user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  const logout = async () => {
    await signOut(auth);
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
        <div>
          <button onClick={toggleDropdown} className="hidden md:block">
            <svg
              fill="#ffffff"
              width="50px"
              height="50px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="hover:fill-primaryHover transition-colors cursor-pointer"
            >
              <title>Menu</title>
              <path d="M4 28q0 0.832 0.576 1.44t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.44q0-1.44-0.672-2.912t-1.76-2.624-2.496-2.144-2.88-1.504q1.76-1.088 2.784-2.912t1.024-3.904v-1.984q0-3.328-2.336-5.664t-5.664-2.336-5.664 2.336-2.336 5.664v1.984q0 2.112 1.024 3.904t2.784 2.912q-1.504 0.544-2.88 1.504t-2.496 2.144-1.76 2.624-0.672 2.912z"></path>
            </svg>
          </button>
          <Dropdown
            dropdownOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            logout={logout}
            user={user}
          />
          <button onClick={toggleSidebar} className="p-2 md:hidden">
            <img src={HamburgerIcon} alt="mobile menu" />
          </button>
        </div>
        <Sidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
          logout={logout}
          user={user}
        />
    </header>
  );
};

export default Header;
