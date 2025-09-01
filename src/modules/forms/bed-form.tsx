import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import React from 'react';
import type { SetStateAction } from 'react';

type FormProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  pacientes: { nome: string }[];
  setor: { id: number; name: string }[];
};

export const BedForm: React.FC<FormProps> = ({ showForm, setShowForm, pacientes, setor }) => {
  const [selectedPaciente, setSelectedPaciente] = React.useState<string>('');
  const [selectedSetor, setSelectedSetor] = React.useState<string>('');
  const [selectedQuarto, setSelectedQuarto] = React.useState<number | string>('');
  const quartos = [
    { quarto: 1, estado: 'livre' },
    { quarto: 2, estado: 'ocupado' },
    { quarto: 3, estado: 'livre' },
    { quarto: 4, estado: 'ocupado' },
    { quarto: 5, estado: 'livre' },
  ];

  const handlePacienteChange = (event: SelectChangeEvent) => {
    setSelectedPaciente(event.target.value);
  };

  const handleSetorChange = (event: SelectChangeEvent) => {
    setSelectedSetor(event.target.value);
  };

  const handleQuartoChange = (event: SelectChangeEvent) => {
    setSelectedQuarto(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedPaciente || !selectedSetor || !selectedQuarto) {
      alert('Por favor, selecione todos os campos!');
      return;
    }

    // Aqui você pode processar a atribuição do quarto, por exemplo, enviar ao servidor ou atualizar o estado
    console.log('Paciente atribuído:', selectedPaciente);
    console.log('Setor selecionado:', selectedSetor);
    console.log('Quarto selecionado:', selectedQuarto);

    // Fechar o formulário após a submissão
    setShowForm(false);
  };

  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
      <Box sx={{ padding: 2, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h3>Atribuir quarto a paciente:</h3>
        <form onSubmit={handleSubmit}>
          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="paciente">Paciente</InputLabel>
            <Select labelId="paciente" id="paciente" value={selectedPaciente} onChange={handlePacienteChange}>
              {pacientes.map(paciente => (
                <MenuItem key={paciente.nome} value={paciente.nome}>
                  {paciente.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="setor">Setor</InputLabel>
            <Select labelId="setor" id="setor" value={selectedSetor} onChange={handleSetorChange}>
              {setor.map(setorItem => (
                <MenuItem key={setorItem.id} value={setorItem.name}>
                  {setorItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="quarto">Quartos livres</InputLabel>
            <Select labelId="quarto" id="quarto" value={selectedQuarto} onChange={handleQuartoChange}>
              {quartos.map(quarto => (
                <MenuItem key={quarto.quarto} value={quarto.quarto} disabled={quarto.estado === 'ocupado'}>
                  Quarto {quarto.quarto} {quarto.estado === 'ocupado' && '(Ocupado)'}
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
