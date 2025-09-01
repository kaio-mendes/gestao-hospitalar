import { Box, Button, Paper, Typography } from '@mui/material';
import type { Professional } from '../types';

type GridProfessionalsProps = {
  profissionais: Professional[];
  showPacientes: (id: number, nome: string) => void;
};

export const GridProfessionals = ({ profissionais, showPacientes }: GridProfessionalsProps) => {
  return profissionais.length > 0 ? (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
        width: '100%',
        padding: '1rem',
        boxSizing: 'border-box',
      }}
    >
      {profissionais.map(profissional => (
        <Paper
          key={profissional.id}
          elevation={3}
          sx={{
            width: 200,
            height: 140,
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
            {profissional.tipo} - {profissional.setor || 'sem setor'}
          </Typography>
          <Button color="primary" variant="contained" onClick={() => showPacientes(profissional.id, profissional.name)}>
            Pacientes
          </Button>
        </Paper>
      ))}
    </Box>
  ) : (
    <h3 style={{ width: '100%', textAlign: 'center' }}>Sem pacientes cadastrados</h3>
  );
};
