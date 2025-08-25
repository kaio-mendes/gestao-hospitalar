import { useEffect, useState } from 'react';
import { Title } from '../components/title';
import axios from 'axios';
import { Box, Button, Paper, Typography } from '@mui/material';

type Professional = {
  id: number;
  name: string;
  tipo: string;
  setor: string;
};

export const Professionals = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profissionais, setProfissionais] = useState<Professional[]>([]);

  useEffect(() => {
    async function showProfessionals() {
      const response = await axios.get(`${apiUrl}/profissionais`, { withCredentials: true });
      setProfissionais(response.data.professionals);
    }
    showProfessionals();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: '2rem',
      }}
    >
      <Title title="Profissionais" />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        {profissionais.map(profissional => (
          <Paper
            key={profissional.id}
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
              {profissional.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profissional.tipo} - {!profissional.setor ? 'sem setor' : profissional.setor}
            </Typography>
            <Button color="primary" variant="contained">
              Pacientes
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
