import { Box, Button, Drawer, TextField, Typography } from '@mui/material';
import axios from 'axios';
import type React from 'react';
import { useState } from 'react';

type Consulta = {
  id: number;
  paciente: {
    id: number;
    nome: string;
  };
  medicoResponsavel: {
    id: number;
  };
  dataConsulta: string;
  horaConsulta: string;
};

type GerarLaudoProps = {
  showForm: boolean;
  toogleForm: () => void;
  pacienteConsultando: Consulta | null;
};

export const GerarLaudo: React.FC<GerarLaudoProps> = ({ toogleForm, showForm, pacienteConsultando }) => {
  const [sintomas, setSintomas] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [prescricoes, setPrescricoes] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  if (!pacienteConsultando) return null;

  async function salvarLaudo() {
    console.log({
      pacienteId: pacienteConsultando?.paciente.id,
      medicoResponsavelId: pacienteConsultando?.medicoResponsavel.id,
      dataConsulta: pacienteConsultando?.dataConsulta,
      horaConsulta: pacienteConsultando?.horaConsulta,
      sintomas: sintomas,
      observacao: observacoes,
      prescricao: prescricoes,
    });
    try {
      const response = await axios.post(
        `${apiUrl}/laudo`,
        {
          agendamentoId: pacienteConsultando?.id,
          pacienteId: pacienteConsultando?.paciente.id,
          medicoResponsavelId: pacienteConsultando?.medicoResponsavel.id,
          dataConsulta: pacienteConsultando?.dataConsulta,
          horaConsulta: pacienteConsultando?.horaConsulta,
          sintomas: sintomas,
          observacao: observacoes,
          prescricao: prescricoes,
          finalizado: true,
        },
        { withCredentials: true }
      );
      toogleForm();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Drawer anchor="right" open={showForm} onClose={toogleForm}>
      <Box sx={{ p: 3, width: 500, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h5">Gerar Laudo</Typography>
        {pacienteConsultando && (
          <Typography variant="subtitle1">Paciente: {pacienteConsultando.paciente.nome}</Typography>
        )}

        <TextField
          label="Sintomas do paciente"
          multiline
          rows={3}
          value={sintomas}
          onChange={e => setSintomas(e.target.value)}
        />

        <TextField
          label="Observações do médico"
          multiline
          rows={3}
          value={observacoes}
          onChange={e => setObservacoes(e.target.value)}
        />

        <TextField
          label="Prescrições"
          multiline
          rows={3}
          value={prescricoes}
          onChange={e => setPrescricoes(e.target.value)}
        />

        <Button variant="contained" color="primary" onClick={salvarLaudo}>
          Salvar Laudo
        </Button>
      </Box>
    </Drawer>
  );
};
