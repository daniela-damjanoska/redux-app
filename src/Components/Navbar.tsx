import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
  colorLight: {
    color: "primary.main",
  },
  colorDark: {
    backgroundColor: "primary.dark",
  },
};

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const avatarUrl = localStorage.getItem("avatar");
  const userFirstName = localStorage.getItem("userFirstName");
  const navigate = useNavigate();
  // const location = useLocation();

  const handleClose = () => setAnchorEl(null);

  const handleClick = (e: { currentTarget: HTMLElement }) =>
    setAnchorEl(e.currentTarget);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.colorDark}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={styles.toolbarTypo}>
            {/* Welcome {location.state.userFirstName} */}
            Welcome {userFirstName}
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
            <MenuItem onClick={handleClose} sx={styles.colorLight}>
              My account
            </MenuItem>
            <MenuItem onClick={() => navigate("/")} sx={styles.colorLight}>
              Sign Out
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
