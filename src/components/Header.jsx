import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import LightModeTwoToneIcon from "@mui/icons-material/LightModeTwoTone";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";
import { drawerWidth, collapsedWidth } from "./Sidebar";

const Header = ({ isDarkMode, toggleDarkMode, collapsed }) => {
  const theme = useTheme();
  const isMonitor = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <AppBar
      variant="outlined"
      position="fixed"
      sx={{
        width: isMonitor
          ? `calc(100% - ${collapsed ? collapsedWidth : drawerWidth}px)`
          : "100%",
        ml: isMonitor ? `${collapsed ? collapsedWidth : drawerWidth}px` : 0,
        minHeight: "70px",
        ml: isMonitor ? `${drawerWidth}px` : 0,
        zIndex: 1000,
        backdropFilter: "blur(10px)", // <- blur effect
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.2), // dynamic transparency
        boxShadow: "none",
        border: "none",
        transition: "width 0.3s, margin 0.3s",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ color: "text.primary", marginLeft: 4 }}>
          Cloute Technologies
        </Typography>
        <IconButton onClick={toggleDarkMode} sx={{ marginLeft: "auto" }}>
          {isDarkMode ? <LightModeTwoToneIcon /> : <DarkModeTwoToneIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
