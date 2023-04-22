import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Menu, MenuItem, Divider } from "@mui/material";

const Dropdown = ({ logout, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="menu-button"
        aria-controls={open ? "menu-dropdown" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
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
      </Button>
      {user ? (
        <Menu
          id="menu-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "menu-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/">Workouts</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/account">Account</Link>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <span onClick={logout}>Logout</span>
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="menu-dropdown"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "menu-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/login">Login/Join</Link>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

export default Dropdown