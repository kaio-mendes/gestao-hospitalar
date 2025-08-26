import { Box, Drawer, Typography, Button, TextField } from '@mui/material';

import axios from 'axios';
import { useState } from 'react';
import { Laudo } from './laudo';
type AgendarConsultaProps = {
  paciente: {
    id: number;
    nome: string;
    observacao: string;
    pacienteId: number;
    medicoResponsavel?: { id: number; name: string };
  };
  setAgendar: () => void;
};

export const AgendarConsulta = ({ paciente, setAgendar }: AgendarConsultaProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [dataConsulta, setDataConsulta] = useState('');
  const [observacao, setObservacao] = useState(paciente.observacao || '');
  const [horaConsulta, setHoraConsulta] = useState<Date | null>(null);

  const marcarConsulta = async () => {
    if (!dataConsulta) {
      alert('Escolha uma data para a consulta.');

      return;
    }

    try {
      console.log('Agendando consulta para:', paciente.nome);
      const isoDate = new Date(dataConsulta).toISOString();
      let horaString = null;
      if (horaConsulta) {
        const h = horaConsulta.getHours().toString().padStart(2, '0');
        const m = horaConsulta.getMinutes().toString().padStart(2, '0');
        horaString = `${h}:${m}:00`;
      }
      const response = await axios.post(
        `${apiUrl}/agendar`,
        {
          pacienteId: paciente.id,
          medicoResponsavelId: paciente.medicoResponsavel?.id || null,
          dataConsulta: isoDate,
          observacao: observacao,
          horaConsulta: horaString,
        },
        { withCredentials: true }
      );

      console.log('Consulta agendada:', response.data);
      setAgendar();
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
      alert('Não foi possível agendar a consulta. Tente novamente.');
    }
  };
  return (
    <Drawer anchor="right" open={true} onClose={setAgendar}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600 }}>
        <Typography variant="h5">Agendar Consulta</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Paciente: {paciente.nome}
        </Typography>
        <Typography variant="subtitle2">
          Médico Responsável: {paciente.medicoResponsavel?.name || 'Sem médico'}
        </Typography>
        <TextField
          variant="filled"
          label="Data de Consulta"
          name="dataConsulta"
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ m: 1 }}
          value={dataConsulta}
          onChange={e => setDataConsulta(e.target.value)}
        />

        <TextField
          label="Observações"
          multiline
          minRows={4}
          maxRows={10}
          variant="outlined"
          fullWidth
          value={observacao}
          onChange={e => setObservacao(e.target.value)}
        />
        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={marcarConsulta}>
          Confirmar Agendamento
        </Button>
      </Box>
    </Drawer>
  );
};
