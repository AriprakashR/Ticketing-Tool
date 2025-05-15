import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  TextField,
  Card,
  Toolbar,
  Box,
} from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import Header from "./components/Header";
import ResponsiveBox from "./components/ResponsiveBox";
import Sidebar from "./components/Sidebar";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Header
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: 30 }, // margin for sidebar on desktop
          mt: 8,
          p: 2,
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
