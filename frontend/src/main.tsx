import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import theme from "./themes/light.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App />
        </CssBaseline>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
