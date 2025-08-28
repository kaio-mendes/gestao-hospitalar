import { Box, Button, Paper, Typography } from '@mui/material';
import type { Paciente } from '../types';
import type React from 'react';

type GridPatientsProps = {
  pacientes: Paciente[];
  abrirAgendamento: (paciente: Paciente) => void;
};

export const GridPatients = ({ pacientes, abrirAgendamento }: GridPatientsProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', width: '100%', justifyContent: 'center' }}>
      {pacientes && pacientes.length > 0 ? (
        pacientes.map(paciente => (
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
        ))
      ) : (
        <h3>Sem pacientes cadastrados</h3>
      )}
    </Box>
  );
};
