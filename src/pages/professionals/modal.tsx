import { Box, Button, Modal, Typography } from '@mui/material';
import type { Paciente } from './types';

type ModalComponentProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  medicoNome: string;
  pacientes: Paciente[];
};

export const ModalComponent = ({ showModal, setShowModal, medicoNome, pacientes }: ModalComponentProps) => {
  return (
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
              Idade: {p.idade}
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
  );
};
