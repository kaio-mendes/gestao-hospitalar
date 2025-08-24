import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Header } from './components/header.tsx';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { ChangeThemeProvider } from './providers/dark-mode.tsx';
import { ThemeApplier } from './theme-applier.tsx';
import { IsAdminProvider } from './context/is-admin-context.tsx';
import { Navbar } from './components/navbar.tsx';
import { AppRoutes } from './Routes.tsx';

const RootLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {!isLoginPage && <Header />}
      <div style={{ display: 'flex', flex: 1 }}>
        {!isLoginPage && <Navbar />} {/* Navbar fixa */}
        <main style={{ flex: 1 }}>
          <AppRoutes /> {/* Rotas só mudam o conteúdo principal */}
        </main>
      </div>
    </div>
  );
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChangeThemeProvider>
      <ThemeApplier />
      <BrowserRouter>
        <IsAdminProvider>
          <RootLayout />
        </IsAdminProvider>
      </BrowserRouter>
    </ChangeThemeProvider>
  </StrictMode>
);
