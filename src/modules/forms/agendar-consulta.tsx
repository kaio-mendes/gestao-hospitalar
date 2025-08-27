import { Box, Drawer, Typography, Button, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';

import axios from 'axios';
import { useEffect, useState } from 'react';
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

  const [dataConsulta, setDataConsulta] = useState<Dayjs | null>(dayjs());
  const [observacao, setObservacao] = useState(paciente.observacao || '');
  const [horaConsulta, setHoraConsulta] = useState<Dayjs | null>(null);
  const [consultasAgendadas, setConsultasAgendadas] = useState<AgendarConsultaProps[]>([]); //bloquear de marcar consultas no mesmo horario

  useEffect(() => {
    async function showSchedules() {
      try {
        const currentSchedules = await axios.get(`${apiUrl}/agendamento`, { withCredentials: true });
        setConsultasAgendadas(currentSchedules.data.agendamentos);
        console.log(currentSchedules.data.agendamentos);
      } catch (err) {
        console.log(err);
      }
    }
    showSchedules();
  }, []);

  const marcarConsulta = async () => {
    if (!dataConsulta) {
      alert('Escolha uma data para a consulta.');

      return;
    }

    try {
      console.log('Agendando consulta para:', paciente.nome);
      const isoDate = new Date(dataConsulta).toISOString();

      const response = await axios.post(
        `${apiUrl}/agendar`,
        {
          pacienteId: paciente.id,
          medicoResponsavelId: paciente.medicoResponsavel?.id || null,
          dataConsulta: isoDate,
          observacao: observacao,
          horaConsulta: horaConsulta,
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

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            disablePast={true}
            label="Data de Consulta"
            value={dataConsulta}
            onChange={newValue => setDataConsulta(newValue)}
            sx={{ m: 1 }}
          />
          <TimePicker
            label="Hora da consulta"
            value={horaConsulta}
            onChange={newValue => setHoraConsulta(newValue)}
            sx={{ m: 1 }}
          />
        </LocalizationProvider>

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
