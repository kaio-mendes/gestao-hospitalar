import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { SetStateAction } from 'react';
import type React from 'react';
type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};
export const CreateWorker: React.FC<Form> = ({ form, setForm }) => {
  const setores = [
    {
      setor: 1,
      ala: 'Pediatria',
    },
    {
      setor: 2,
      ala: 'Dermatologia',
    },
    {
      setor: 3,
      ala: 'Oncologia',
    },
    {
      setor: 4,
      ala: 'Neurologia',
    },
    {
      setor: 5,
      ala: 'Clínica',
    },
  ];
  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Cadastro de Profissionais</h3>
        <form style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <TextField
            fullWidth
            variant="filled"
            label="Nome do Profissional"
            name="NomeProfissional"
            sx={{ m: 1, width: '100%' }}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            label="Email"
            name="Email"
            sx={{ m: 1, width: '100%' }}
            type="email"
            required
          />
          <TextField
            fullWidth
            variant="filled"
            label="Telefone"
            name="Telefone"
            sx={{ m: 1, width: '100%' }}
            type="tel"
            required
          />
          <TextField
            fullWidth
            variant="filled"
            label="Senha"
            name="senha"
            sx={{ m: 1, width: '100%' }}
            type="password"
            required
          />
          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="setor">Setor</InputLabel>
            <Select labelId="setor" id="setor">
              {setores.map(setores => (
                <MenuItem key={setores.setor} value={setores.ala}>
                  {setores.ala}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
