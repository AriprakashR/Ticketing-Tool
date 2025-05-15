import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { drawerWidth } from "./Sidebar";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isMonitor = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <AppBar
      variant="en"
      position="fixed"
      sx={{
        width: isMonitor ? `calc(100% - ${drawerWidth}px)` : "100%",
        ml: isMonitor ? `${drawerWidth}px` : 0,
        zIndex: 1201,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
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
