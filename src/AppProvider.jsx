import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Theme Configuration
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const AppProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppProvider;
