import { Box, Button, Drawer, TextField } from '@mui/material';
import type { SetStateAction } from 'react';
import type React from 'react';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

export const CreateSector: React.FC<Form> = ({ form, setForm }) => {
  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Cadastro de Setores</h3>
        <form style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <TextField fullWidth variant="filled" label="Nome do Setor" name="Setor" sx={{ m: 1, width: '100%' }} />
          <TextField fullWidth variant="filled" label="Responsável" name="Responsavel" sx={{ m: 1, width: '100%' }} />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
              Salvar
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  );
};
