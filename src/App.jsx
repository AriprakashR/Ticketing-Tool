import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  TextField,
  Card,
} from "@mui/material";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Card style={{ padding: 20, margin: 20 }}>
        <TextField
          placeholder="Enter User Name"
          hiddenLabel
          size="small"
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={() => setIsDarkMode(!isDarkMode)}>
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </Button>
      </Card>
    </ThemeProvider>
  );
}

export default App;
