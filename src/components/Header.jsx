import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { DarkMode, LightMode } from "@mui/icons-material";
import { drawerWidth } from "./Sidebar";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const theme = useTheme();
  const isMonitor = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <AppBar
      variant="outlined"
      position="fixed"
      sx={{
        width: isMonitor ? `calc(100% - ${drawerWidth}px)` : "100%",
        minHeight: "70px",
        ml: isMonitor ? `${drawerWidth}px` : 0,
        zIndex: 1201,
        backdropFilter: "blur(10px)", // <- blur effect
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.2), // dynamic transparency
        boxShadow: "none",
        border: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" marginLeft={4}>
          Cloute Technologies
        </Typography>
        <IconButton onClick={toggleDarkMode} sx={{ marginLeft: "auto" }}>
          {isDarkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
