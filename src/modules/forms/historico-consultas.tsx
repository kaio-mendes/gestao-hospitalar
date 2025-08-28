import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { Title } from '../../components/title';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { Paciente } from '../../pages/patients/types.tsx';

type LaudoPaciente = {
  id: number;
  dataConsulta: string;
  sintomas: string;
  observacao?: string;
  prescricao?: string;
  paciente: {
    id: number;
    nome: string;
  };
};

type TablePatientsProps = {
  pacientes: Paciente[];
};

export const HistoricoConsultas: React.FC<TablePatientsProps> = ({ pacientes }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [historico, setHistorico] = useState<LaudoPaciente[]>([]);
  const [showModal, setShowModal] = useState(false);
  async function getHistorico(pacienteId: number) {
    setShowModal(true);
    try {
      const response = await axios.get<{ laudoPaciente: LaudoPaciente[] }>(`${apiUrl}/laudo/${pacienteId}`, {
        withCredentials: true,
      });
      setHistorico(response.data.laudoPaciente);
      console.log(response.data.laudoPaciente);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '2rem' }}>
      <Title title="Pacientes" />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {pacientes && pacientes.length > 0 ? (
          pacientes.map(paciente => (
            <Paper
              key={paciente.id}
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
                backgroundColor: '#f4f4f4',
                cursor: 'pointer',
              }}
            >
              <Typography>{paciente.nome}</Typography>
              <Typography>Médico: {paciente.medicoResponsavel?.name || 'Sem médico'}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                <Button color="primary" variant="contained" onClick={() => getHistorico(paciente.id)}>
                  Histórico
                </Button>
              </Box>
            </Paper>
          ))
        ) : (
          <h3>Sem pacientes cadastrados</h3>
        )}
      </Box>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxHeight: '80vh',
            overflowY: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          {historico.length > 0 ? (
            historico.map(item => (
              <Box key={item.id} sx={{ mb: 2, borderBottom: '1px solid #ddd', pb: 2 }}>
                <Typography variant="h6">Data Consulta: {new Date(item.dataConsulta).toLocaleDateString()}</Typography>
                <Typography>Paciente: {item.paciente.nome}</Typography>
                <Typography>Sintomas: {item.sintomas}</Typography>
                <Typography>Observação: {item.observacao}</Typography>
                <Typography>Prescrição: {item.prescricao}</Typography>
              </Box>
            ))
          ) : (
            <Typography color="text.secondary">Nenhum histórico encontrado</Typography>
          )}

          <Button
            variant="contained"
            color="error"
            sx={{ mt: 3, display: 'block', ml: 'auto' }}
            onClick={() => setShowModal(false)}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
