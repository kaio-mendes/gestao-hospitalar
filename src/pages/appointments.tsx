import { Box, Button, Paper, Typography } from '@mui/material';
import { Title } from '../components/title';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GerarLaudo } from '../modules/forms/gerar-laudo';

type Consulta = {
  id: number;
  dataConsulta: string;
  finalizado: boolean;
  paciente: { nome: string };
  medicoResponsavel?: { name: string };
};

export const Appointments = () => {
  const [showForm, setShowForm] = useState(false);
  const [agendamentos, setAgendamentos] = useState<Consulta[]>([]);
  const [pacienteConsultando, setPacienteConsultando] = useState<Consulta | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const response = await axios.get(`${apiUrl}/agendamento`, { withCredentials: true });
        setAgendamentos(response.data.agendamentos);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    }
    fetchAgendamentos();
  }, []);

  function toggleForm(agendado: Consulta | null = null) {
    if (agendado) setPacienteConsultando(agendado);
    setShowForm(prev => !prev);
  }

  function renderAgendamentos(filtroFinalizado: boolean, title: string) {
    const list = agendamentos.filter(a => a.finalizado === filtroFinalizado);

    if (!list.length) return <Typography sx={{ m: 2, textAlign: 'center' }}>Nenhum agendamento encontrado</Typography>;

    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', padding: '1rem' }}>
        {list.map(agendado => (
          <Paper
            key={agendado.id}
            elevation={3}
            sx={{
              width: 300,
              height: 220,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 2,
              backgroundColor: agendado.finalizado ? '#999999ff' : '#f4f4f4',
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
              paciente: {agendado.paciente.nome}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
              {new Date(agendado.dataConsulta).toLocaleDateString('pt-BR')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              medico: {agendado.medicoResponsavel?.name || 'Sem médico'}
            </Typography>
            {agendado.finalizado ? (
              <Typography variant="body1" color="white">
                Finalizado
              </Typography>
            ) : (
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <Button color="success" variant="contained">
                  Ir para consulta
                </Button>
                <Button color="primary" variant="contained" onClick={() => toggleForm(agendado)}>
                  Laudo
                </Button>
              </Box>
            )}
          </Paper>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Title title="Agendamentos" />

      {renderAgendamentos(false, 'Não finalizado')}

      <Typography variant="h6" sx={{ ml: 2, mt: 4 }}>
        Atendidos
      </Typography>
      {renderAgendamentos(true, 'Finalizado')}

      {showForm && <GerarLaudo toogleForm={toggleForm} showForm={showForm} pacienteConsultando={pacienteConsultando} />}
    </Box>
  );
};
