import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "./index.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from '@mui/material';

const theme = createTheme();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
