import React, { useState } from "react";
import { useNavigate } from "react-router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const styles = {
  toolbarTypo: {
    flexGrow: 1,
    textAlign: "center",
  },
  toolbarAvatar: {
    width: 56,
    height: 56,
  },
  color: {
    color: "primary.main",
  },
};

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const avatarUrl = localStorage.getItem("avatar");
  const navigate = useNavigate();

  const handleClose = () => setAnchorEl(null);

  const handleClick = (e: { currentTarget: HTMLElement }) =>
    setAnchorEl(e.currentTarget);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.toolbarTypo}>
            Welcome
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <Avatar
              alt="avatar"
              // @ts-ignore
              src={avatarUrl}
              sx={styles.toolbarAvatar}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} sx={styles.color}>
              My account
            </MenuItem>
            <MenuItem onClick={() => navigate("/")} sx={styles.color}>
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
