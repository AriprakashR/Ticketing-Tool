import { createTheme } from "@mui/material/styles";

const baseSettings = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: `"Public Sans Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "8px 20px",
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseSettings,
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export const darkTheme = createTheme({
  ...baseSettings,
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#141a21",
      paper: "#141a21",
    },
  },
  components: {
    ...baseSettings.components,
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#101a26",
          borderRadius: 14,
        },
      },
    },
  },
});
