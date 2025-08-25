import { Box, Button, Paper, Typography } from '@mui/material';
import { Title } from '../components/title';
import { Calendar } from '../modules/calendar';
import { Add } from '../modules/add';
import { useEffect, useState } from 'react';
import { AgendaForm } from '../modules/forms/agenda-form';
import axios from 'axios';

export const Appointments = () => {
  const [showForm, setShowForm] = useState(false);
  const [agendamentos, setAgendamentos] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await axios.get(`${apiUrl}/agendamento`, { withCredentials: true });
        setAgendamentos(response.data.agendados);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }

    fetchAgendamentos();
  }, []);

  function toogleForm() {
    setShowForm(prev => !prev);
  }
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <Title title="Agendamentos" />
      <Box sx={{ margin: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Calendar />

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {agendamentos.map(agendado => (
            <Paper
              key={agendado.id}
              elevation={3}
              sx={{
                width: 200,
                height: 120,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#f4f4f4',
                cursor: 'pointer',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
                {agendado.paciente.nome}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {agendado.medicoResponsavel?.name || 'Sem médico'}
              </Typography>
            </Paper>
          ))}
        </Box>
        <Add onClick={toogleForm} />
        {showForm ? <AgendaForm showForm={showForm} setShowForm={setShowForm} /> : ''}
      </Box>
    </Box>
  );
};
