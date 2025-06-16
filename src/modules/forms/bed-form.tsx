import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type React from 'react';
import type { SetStateAction } from 'react';

type form = {
  showForm: boolean;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
};

export const BedForm: React.FC<form> = ({ showForm, setShowForm }) => {
  const pacientes = [
    { nome: 'Joao', idade: 53 },
    { nome: 'Kaio', idade: 51 },
    { nome: 'Maria', idade: 41 },
    { nome: 'Joana', idade: 23 },
    { nome: 'Garcia', idade: 21 },
    { nome: 'Ivete', idade: 11 },
  ];

  const quartos = [
    { quarto: 1, estado: 'livre' },
    { quarto: 2, estado: 'ocupado' },
    { quarto: 3, estado: 'livre' },
    { quarto: 4, estado: 'ocupado' },
    { quarto: 5, estado: 'livre' },
  ];
  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
      <Box sx={{ padding: 2, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h3>Atribuir quarto a paciente:</h3>
        <form>
          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="paciente">Paciente</InputLabel>
            <Select labelId="paciente" id="paciente">
              {pacientes.map(paciente => (
                <MenuItem key={paciente.nome} value={paciente.nome}>
                  {paciente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="quarto">Quartos livres</InputLabel>
            <Select labelId="quarto" id="quarto">
              {quartos.map(quarto => (
                <MenuItem key={quarto.quarto} value={quarto.quarto} disabled={quarto.estado === 'ocupado'}>
                  Quarto {quarto.quarto} {quarto.estado === 'ocupado' && '(Ocupado)'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Salvar
        </Button>
      </Box>
    </Drawer>
  );
};
