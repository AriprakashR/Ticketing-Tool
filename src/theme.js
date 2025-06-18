import { createTheme } from "@mui/material/styles";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

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
      },
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: KeyboardArrowDownRoundedIcon,
      },
      styleOverrides: {
        icon: {
          color: "#637381",
          fontSize: "20px",
          right: 10,
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        IconComponent: KeyboardArrowDownRoundedIcon,
      },
      styleOverrides: {
        popupIndicator: {
          color: "#637381",
          fontSize: 20,
        },
        clearIndicator: {
          color: "#637381",
        },
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
    // In baseSettings.components
    MUIDatePicker: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit", // This will inherit from MuiOutlinedInput styles
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
          "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "inherit",
          },
        },
      },
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        top: 80,
        borderRadius: 12,
        boxShadow: "0px 8px 24px rgba(0,0,0,0.2)",
        padding: "0 12px",
      },
    },
  },
  MuiAlert: {
    styleOverrides: {
      outlined: {
        fontWeight: 600,
        backgroundColor: "#fff",
        borderColor: "#E0E0E0",
        color: "#1C252E",
        "& .MuiAlert-icon": {
          color: "#1976d2", // match primary or custom icon color
        },
      },
      outlinedSuccess: {
        borderColor: "#caefd8",
        color: "#118d57",
        backgroundColor: "#eaf6ef",
      },
      outlinedError: {
        borderColor: "#ef9a9a",
        color: "#b71d18",
        backgroundColor: "#fbeeec",
      },
      outlinedWarning: {
        borderColor: "#fce8c3",
        color: "#b76e00",
        backgroundColor: "#fbf4e8",
      },
      outlinedInfo: {
        borderColor: "#c2ecf4",
        color: "#006ca8",
        backgroundColor: "#e7f5f9",
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
    MuiSelect: {
      defaultProps: {
        IconComponent: KeyboardArrowDownRoundedIcon,
      },
      styleOverrides: {
        icon: {
          color: "#919EAB",
          fontSize: "20px",
          right: 10,
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        IconComponent: KeyboardArrowDownRoundedIcon,
      },
      styleOverrides: {
        popupIndicator: {
          color: "#919EAB",
          fontSize: 20,
        },
        clearIndicator: {
          color: "#919EAB",
        },
      },
    },
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
