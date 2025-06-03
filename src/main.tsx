import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Header } from './components/header.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <div style={{ display: 'flex', flex: 1 }}>
          <App />
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
);
