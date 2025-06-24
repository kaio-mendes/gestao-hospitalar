import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { SetStateAction } from 'react';
import React from 'react';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import 'dayjs/locale/pt-br';

type forms = {
  showForm: boolean;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
};

export const AgendaForm: React.FC<forms> = ({ showForm, setShowForm }) => {
  dayjs.locale('pt-br');

  const [value, setValue] = React.useState(dayjs());

  const pacientes = [
    { nome: 'Joao', idade: 53 },
    { nome: 'Kaio', idade: 51 },
    { nome: 'Maria', idade: 41 },
    { nome: 'Joana', idade: 23 },
    { nome: 'Garcia', idade: 21 },
    { nome: 'Ivete', idade: 11 },
  ];

  const medico = [
    { nome: 'Jaime', area: 'Cardiologia' },
    { nome: 'Joana', area: 'Clinico' },
    { nome: 'Maria', area: 'Pediatra' },
    { nome: 'Lurdes', area: 'Neurologia' },
    { nome: 'Suzie', area: 'Obstetricia' },
    { nome: 'Leon', area: 'Dermatologia' },
  ];
  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
      <Box sx={{ padding: 2, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h3>Agendar Consulta:</h3>
        <form>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
              <InputLabel id="medico">Médico</InputLabel>
              <Select labelId="medico" id="medico">
                {medico.map(medico => (
                  <MenuItem key={medico.nome} value={medico.nome}>
                    {medico.nome} - {medico.area}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <DateTimePicker
            label="Data e hora da consulta"
            value={value}
            onChange={newValue => setValue(newValue)}
            minTime={dayjs().hour(7).minute(30)}
            maxTime={dayjs().hour(18).minute(0)}
            ampm={false}
            minutesStep={30}
            sx={{ width: '100%', marginTop: 2 }}
            format="DD/MM/YYYY HH:mm"
          />
          <TextField
            id="standard-multiline-flexible"
            label="Motivo da consulta"
            multiline
            maxRows={5}
            variant="filled"
            sx={{ width: '100%', marginTop: 2 }}
          />
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
