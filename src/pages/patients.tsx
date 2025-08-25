import { useEffect, useState } from 'react';
import { Title } from '../components/title';
import { Add } from '../modules/add';
import { PatientsForm } from '../modules/forms/patients-form';
import { AgendarConsulta } from '../modules/forms/agendar-consulta';
import { Box, Button, Paper, Typography } from '@mui/material';
import axios from 'axios';

type Pacientes = {
  id: number;
  medicoresponsavelId: number;
  nome: string;
  medicoResponsavel?: {
    id: number;
    name: string;
  };
};

export const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Pacientes | null>(null);

  function toogleForm() {
    setShowForm(prev => !prev);
  }

  const apiUrl = import.meta.env.VITE_API_URL;
  const [pacientes, setPacientes] = useState<Pacientes[]>([]);

  useEffect(() => {
    async function showPacientes() {
      const response = await axios.get(`${apiUrl}/pacientes`, { withCredentials: true });
      setPacientes(response.data.pacientes);
    }
    showPacientes();
  }, []);

  const abrirAgendamento = (paciente: Pacientes) => {
    console.log(paciente.medicoResponsavel?.name);
    setPacienteSelecionado(paciente);
  };

  const fecharAgendamento = () => {
    setPacienteSelecionado(null);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '2rem' }}>
      <Title title="Pacientes" />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
        {pacientes.map(paciente => (
          <Paper
            key={paciente.id}
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
              {paciente.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {paciente.medicoResponsavel?.name || 'Sem médico'}
            </Typography>
            <Button color="primary" variant="contained" onClick={() => abrirAgendamento(paciente)}>
              Consulta
            </Button>
          </Paper>
        ))}
      </Box>

      {pacienteSelecionado && <AgendarConsulta paciente={pacienteSelecionado} setAgendar={fecharAgendamento} />}

      <Add onClick={toogleForm} />
      {showForm && <PatientsForm setShowForm={setShowForm} toogleForm={toogleForm} showForm={showForm} />}
    </Box>
  );
};
