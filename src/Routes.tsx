import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './pages/auth/private-routh';
import { Login } from './pages/auth/login';
import { HomePage } from './pages/home';
import { NotFound } from './pages/404';
import { Config } from './pages/config';
import { Patients } from './pages/patients';
import { Beds } from './pages/beds';
import { Professionals } from './pages/professionals';
import { Appointments } from './pages/appointments';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/pacientes"
        element={
          <PrivateRoute>
            <Patients />
          </PrivateRoute>
        }
      />
      <Route
        path="/leitos"
        element={
          <PrivateRoute>
            <Beds />
          </PrivateRoute>
        }
      />
      <Route
        path="/profissionais"
        element={
          <PrivateRoute>
            <Professionals />
          </PrivateRoute>
        }
      />
      <Route
        path="/agendamentos"
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route
        path="/configuracao"
        element={
          <PrivateRoute requiredRole="admin">
            <Config />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
