import { Box } from '@mui/material';
import { Title } from '../components/title';
import { Calendar } from '../modules/calendar';
import { Add } from '../modules/add';
import { useState } from 'react';
import { AgendaForm } from '../modules/forms/agenda-form';

export const Appointments = () => {
  const [showForm, setShowForm] = useState(false);
  function toogleForm() {
    setShowForm(prev => !prev);
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Title title="Agendamentos" />
      <Box sx={{ margin: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Calendar />
      </Box>
      <Add onClick={toogleForm} />
      {showForm ? <AgendaForm showForm={showForm} setShowForm={setShowForm} /> : ''}
    </Box>
  );
};
