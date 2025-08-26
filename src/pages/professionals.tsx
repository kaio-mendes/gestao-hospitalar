import { useEffect, useState } from 'react';
import { Title } from '../components/title';
import axios from 'axios';
import { Box, Button, Paper, Typography, Modal } from '@mui/material';

type Professional = {
  id: number;
  name: string;
  tipo: string;
  setor: string;
};

type Paciente = {
  id: number;
  name: string;
  idade: number;
};

export const Professionals = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profissionais, setProfissionais] = useState<Professional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicoNome, setMedicoNome] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function showProfessionals() {
      const response = await axios.get(`${apiUrl}/profissionais`, { withCredentials: true });
      setProfissionais(response.data.professionals);
      console.log(response.data.professionals);
    }
    showProfessionals();
  }, []);

  const showPacientes = async (idMedico: number, nome: string) => {
    try {
      const response = await axios.get(`${apiUrl}/profissionais/${idMedico}/pacientes`, { withCredentials: true });
      setPacientes(response.data.pacientes);
      setMedicoNome(nome);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '2rem' }}>
      <Title title="Profissionais" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
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
              {profissional.tipo} - {!profissional.setor ? 'sem setor' : profissional.setor}
            </Typography>
            <Button
              color="primary"
              variant="contained"
              onClick={() => showPacientes(profissional.id, profissional.name)}
            >
              Pacientes
            </Button>
          </Paper>
        ))}
      </Box>

      {/* Modal de Pacientes */}
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Pacientes de {medicoNome}
          </Typography>

          {pacientes.length > 0 ? (
            pacientes.map(p => (
              <Typography key={p.id} variant="body1" sx={{ borderBottom: '1px solid #ddd', py: 1 }}>
                Nome: {p.nome} <br />
                idade: {p.idade}
              </Typography>
            ))
          ) : (
            <Typography color="text.secondary">Nenhum paciente encontrado</Typography>
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
