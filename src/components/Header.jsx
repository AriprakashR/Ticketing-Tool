import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <AppBar variant="en" position="fixed" sx={{ zIndex: 1300 }}>
      <Toolbar>
        <Typography variant="h6" marginLeft={4}>
          Cloute Technologies
        </Typography>
        <IconButton
          color="inherit"
          onClick={toggleDarkMode}
          sx={{ marginLeft: "auto" }}
        >
          {isDarkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
