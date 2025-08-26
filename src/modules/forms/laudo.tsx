import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { Title } from '../../components/title';

export const Laudo = ({ pacientes }) => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '2rem' }}>
      <Title title="Pacientes" />
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
              <Button color="primary" variant="contained">
                Histórico
              </Button>
            </Box>
          </Paper>
        ))
      ) : (
        <h3>Sem pacientes cadastrados</h3>
      )}
    </Box>
  );
};
