import { createTheme } from "@mui/material/styles";

const lightShadows = [
  "none", // elevation 0
  "0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)", // elevation 1
  ...Array(23).fill("0px 4px 20px rgba(145, 158, 171, 0.12)"), // fallback for elevations 2–24
];

const darkShadows = [
  "none", // elevation 0
  "0 0 2px 0 rgba(0, 0, 0, 0.2), 0 12px 24px -4px rgba(0, 0, 0, 0.12)", // elevation 1
  ...Array(23).fill("0px 4px 20px rgba(0, 0, 0, 0.12)"), // fallback for elevations 2–24
];

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
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black",
          },
        },
        notchedOutline: {
          borderColor: "#EDEFF1",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#A3AEB8",
          "&.Mui-focused": {
            fontWeight: 600,
            color: "black",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#1C252E",
          "&:hover": {
            backgroundColor: "#454F5B",
          },
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...baseSettings,
  shadows: lightShadows,
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
  shadows: darkShadows,
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
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#333E47",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffff",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#637381",
          "&.Mui-focused": {
            color: "#ffff",
            fontWeight: 600,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#ffff",
          "&:hover": {
            backgroundColor: "#C4CDD5",
          },
        },
      },
    },
  },
});
