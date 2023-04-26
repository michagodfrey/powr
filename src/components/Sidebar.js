import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithGoogle, logout } from "../firebase-config";
import { Box, Drawer, Button, List, Divider, ListItem } from '@mui/material';
import HamburgerIcon from "../images/hamburger-menu-svgrepo-com.svg";
import GoogleButton from 'react-google-button';

const Sidebar = ({ user }) => {
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="show menu"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          <Link to="/">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/faq">FAQ</Link>
        </ListItem>
        <ListItem>
          <Link to="/contact">Contact</Link>
        </ListItem>
        {user && (
          <>
            <ListItem>
              <img
                src={localStorage.getItem("image")}
                alt="user Google"
                className="border"
              />
            </ListItem>
            <ListItem>{localStorage.getItem("email")}</ListItem>
            <ListItem>
              <Link to="/">Workouts</Link>
            </ListItem>
            <ListItem>
              <Link to="/account">Account</Link>
            </ListItem>
          </>
        )}
        <Divider />
        {user ? (
          <ListItem onClick={logout}>Log out</ListItem>
        ) : (
          <ListItem>
            <GoogleButton onClick={signInWithGoogle}></GoogleButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
        <Button onClick={toggleDrawer('right', true)}>
          <img src={HamburgerIcon} alt="mobile menu" />
        </Button>
        <Drawer
          anchor="right"
          open={drawer.right}
          onClose={toggleDrawer('right', false)}
        >
          {list('right')}
        </Drawer>
    </>
  );
};

export default Sidebar;
