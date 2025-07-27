import { Route, Routes, useLocation } from 'react-router-dom';
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
import { PrivateRoute } from './pages/auth/private-routh';
import { NotFound } from './pages/404';
import { isAdminContext } from './context/is-admin-context';
import { useContext } from 'react';

export const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const { isAdmin } = useContext(isAdminContext);
  return (
    <>
      {!isLoginPage && <Navbar />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/agendamentos"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/leitos"
            element={
              <PrivateRoute>
                <Beds />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profissionais"
            element={
              <PrivateRoute>
                <Professionals />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/pacientes"
            element={
              <PrivateRoute>
                <Patients />
              </PrivateRoute>
            }
          ></Route>
          {isAdmin ? (
            <Route
              path="/configuracao"
              element={
                <PrivateRoute>
                  <Config />
                </PrivateRoute>
              }
            ></Route>
          ) : (
            ''
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LocalizationProvider>
    </>
  );
};
