import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './pages/home';
import { Appointments } from './pages/appointments';
import { Beds } from './pages/beds';
import { Patients } from './pages/patients';
import { Professionals } from './pages/professionals';
import { Navbar } from './components/navbar';
import { Config } from './pages/config';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Login } from './pages/auth/login';
export const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  return (
    <>
      {!isLoginPage && <Navbar />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<HomePage />}></Route>
          <Route path="/agendamentos" element={<Appointments />}></Route>
          <Route path="/leitos" element={<Beds />}></Route>
          <Route path="/profissionais" element={<Professionals />}></Route>
          <Route path="/pacientes" element={<Patients />}></Route>
          <Route path="/configuracao" element={<Config />}></Route>
        </Routes>
      </LocalizationProvider>
    </>
  );
};
