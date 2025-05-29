import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';
import { Appointments } from './pages/appointments';
import { Beds } from './pages/beds';
import { Patients } from './pages/patients';
import { Professionals } from './pages/professionals';
import { Navbar } from './components/navbar';

export const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/agendamentos" element={<Appointments />}></Route>
        <Route path="/leitos" element={<Beds />}></Route>
        <Route path="/profissionais" element={<Professionals />}></Route>
        <Route path="/pacientes" element={<Patients />}></Route>
      </Routes>
    </Router>
  );
};
