import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Header } from './components/header.tsx';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ChangeThemeProvider } from './providers/dark-mode.tsx';
import { ThemeApplier } from './theme-applier.tsx';

const RootLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {!isLoginPage && <Header />}
      <div style={{ display: 'flex', flex: 1 }}>
        <App />
      </div>
    </div>
  );
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChangeThemeProvider>
      <ThemeApplier />
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    </ChangeThemeProvider>
  </StrictMode>
);
