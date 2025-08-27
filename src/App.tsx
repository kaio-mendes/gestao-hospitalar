import { ThemeProvider } from '@emotion/react';
import './App.css';
import { AppRoutes } from './Routes';
import { theme } from './assets/styles/theme/theme';
import { CssBaseline } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRoutes />
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
