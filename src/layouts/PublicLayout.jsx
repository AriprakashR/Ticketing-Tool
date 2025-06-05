import { Outlet } from "react-router";
import Header from "../components/Layouts/Header";
import { useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";

const getSystemPreference = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

const PublicLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved === "dark"
      ? true
      : saved === "light"
      ? false
      : getSystemPreference();
  });

  const [collapsed, setCollapsed] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme-mode", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode) return;

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
      <Outlet />
    </ThemeProvider>
  );
};

export default PublicLayout;
