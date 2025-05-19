import Header from "../components/Header";
import Sidebar, { drawerWidth, collapsedWidth } from "../components/Sidebar";
import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";

const getSystemPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const PrivateLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved === "dark"
      ? true
      : saved === "light"
      ? false
      : getSystemPreference(); // fallback to system
  });

  const [collapsed, setCollapsed] = useState(true);

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
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        collapsed={collapsed}
      />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Box
        component="main"
        sx={{
          mt: 8,
          p: 2,
          ml: {
            lg: `${collapsed ? collapsedWidth : drawerWidth}px`,
          }, // push content right on monitor
          transition: (theme) =>
            theme.transitions.create("margin", {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.complex,
            }),
        }}
      >
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default PrivateLayout;
