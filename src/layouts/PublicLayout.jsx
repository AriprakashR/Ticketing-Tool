import { Outlet } from "react-router";
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { lightTheme, darkTheme } from "../theme";
import { alpha } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

const getSystemPreference = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

const PublicLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme-mode");
    return saved === "dark" ? true : saved === "light" ? false : getSystemPreference();
  });

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
      <AppBar
        variant="outlined"
        position="fixed"
        sx={{
          minHeight: "70px",
          zIndex: 1000,
          backdropFilter: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
          border: "none",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component="img"
            src="/src/assets/ct-logo-bg-rmv.png"
            alt="Company Logo"
            sx={{
              height: 40,
              width: 50,
              ml: -0.7,
              mt: 2,
              mb: 1.8,
            }}
          />
          <Typography
            sx={{
              color: "text.primary",
              marginTop: 0.5,
              marginLeft: 1.5,
              marginBottom: 0.5,
              fontWeight: 600,
            }}
          >
            Cloute Technologies
          </Typography>
          <IconButton onClick={toggleDarkMode} sx={{ marginLeft: "auto" }}>
            {isDarkMode ? (
              <Icon icon="solar:sun-2-bold-duotone" color="#919EAB" />
            ) : (
              <Icon icon="solar:moon-stars-bold-duotone" color="#637381" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Outlet />
    </ThemeProvider>
  );
};

export default PublicLayout;
