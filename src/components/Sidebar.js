import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Drawer, Button, List, Divider, ListItem } from '@mui/material';
import HamburgerIcon from "../images/hamburger-menu-svgrepo-com.svg";
import userIcon from "../images/user-svgrepo-com.svg";

const Sidebar = ({ logout, user }) => {
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
              <img src={userIcon} alt="user icon" className="border" />
            </ListItem>
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
            <Link to="/login">Login/Join</Link>
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
