import React, { useState } from 'react';
import { Link } from "react-router-dom";
// import { Dropdown } from "flowbite-react";
import Sidebar from "./Sidebar";
import Dropdown from "./Dropdown";
import Hamburger from "../images/hamburger-menu-svgrepo-com.svg";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!sidebarOpen)
  }

  function toggleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  let user = 0

  return (
    <header className="bg-secondary w-full text-white">
      {user === 0 ? (
        <div className="w-full p-4 flex items-center justify-between">
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

          <div className="">
            <div className="hidden md:block">
              {/* <Dropdown label="Dropdown button" dismissOnClick={true}>
                <Dropdown.Item>
                  <Link to="/" className="mx-4">
                    Home
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/faq" className="mx-4">
                    FAQ
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to="/contact" className="mx-4">
                    Contact
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Link to="/login">Login/Join</Link>
                </Dropdown.Item>
              </Dropdown> */}
              <Dropdown />
            </div>

            <button
              onClick={toggleSidebar}
              className="p-2 md:hidden"
            >
              <img src={Hamburger} alt="mobile menu" />
            </button>
          </div>
          <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
      ) : (
        <div className="w-full p-4 flex items-center justify-between">
          <img
            className="max-h-16"
            src={require("../images/powr-logo-noBG.webp")}
            alt="POWR logo"
          />
          <button
            className="h-16 px-6 text-3xl text-white bg-primary hover:bg-primaryHover font-bold border-4"
            // onClick={openModal}
          >
            LOGIN
          </button>
        </div>
      )}
    </header>
  );
}

export default Header