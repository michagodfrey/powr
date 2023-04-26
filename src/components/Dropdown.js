import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithGoogle, logout } from '../firebase-config';
import { Button, Menu, MenuItem, Divider, Avatar } from "@mui/material";
import GoogleButton from 'react-google-button';

const Dropdown = ({ user }) => {
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
        {user ? (<img src={localStorage.getItem('image')} alt="user Google" />) : (<Avatar sx={{ bgcolor: "#e8772e" }} />)}     
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
            <Link to="/account">{localStorage.getItem('email')}</Link>
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
            <GoogleButton onClick={signInWithGoogle}></GoogleButton>
          </MenuItem>
        </Menu>
      )}
    </>
  );
}

export default Dropdown