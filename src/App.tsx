import { ThemeProvider } from '@emotion/react';
import './App.css';
import { AppRoutes } from './Routes';
import { theme } from './assets/styles/theme/theme';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
