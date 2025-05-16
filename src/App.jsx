import { useState, useEffect } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  TextField,
  Card,
  Box,
} from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Header from "./components/Header";
import ResponsiveBox from "./components/ResponsiveBox";
import Sidebar from "./components/Sidebar";
import { drawerWidth } from "./components/Sidebar";
const getSystemPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode === "dark") return true;
    if (savedMode === "light") return false;
    return getSystemPreference(); // fallback to system
  });

  // Save user's choice on toggle
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme-mode", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Listen for system theme change (only if user hasn't overridden)
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode) return; // user has manually selected a mode

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => setIsDarkMode(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Sidebar />
      <Box
        component="main"
        sx={{
          mt: 8,
          p: 2,
          ml: { lg: `${drawerWidth}px` }, // push content right on monitor
          transition: "margin 0.3s",
        }}
      >
        <ResponsiveBox />
        <Card style={{ padding: 20, margin: 20 }}>
          <TextField
            placeholder="Enter User Name"
            hiddenLabel
            size="small"
            sx={{ marginRight: 2 }}
          />
          <Button variant="contained">Save button</Button>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default App;
