import { Box, Drawer, TextField } from '@mui/material';
import type { SetStateAction } from 'react';
import type React from 'react';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

export const ConfigForms: React.FC<Form> = ({ form, setForm }) => {
  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h3>Cadastrando {form}:</h3>
      </Box>
    </Drawer>
  );
};
