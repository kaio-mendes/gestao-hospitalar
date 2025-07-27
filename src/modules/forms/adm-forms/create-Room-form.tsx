import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useState, type FormEvent, type SetStateAction } from 'react';
import type React from 'react';
type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

export const CreateRoom: React.FC<Form> = ({ form, setForm }) => {
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

  const [roomName, setRoomName] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<number>(0);
  const [bedsNum, setBedsNum] = useState<number>(1);
  const [department, setDepartment] = useState<string>('');
  const apiUrl = import.meta.env.VITE_API_URL;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const newRoom = await axios.post(
        `${apiUrl}/novo-quarto`,
        {
          room_name: roomName,
          room_number: roomNumber,
          room_beds: bedsNum,
          department: department,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setRoomName('');
      setRoomNumber(0);
      setBedsNum(1);
      setDepartment('');
      setForm('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Cadastro de Quarto</h3>
        <form
          style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: 'flex' }}>
            <TextField
              fullWidth
              variant="filled"
              label="Nome do Quarto"
              name="quarto"
              sx={{ m: 1, width: '100%' }}
              onChange={e => setRoomName(e.target.value)}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Número"
              name="num_quarto"
              type="number"
              sx={{ m: 1, width: '100%' }}
              onChange={e => setRoomNumber(Number(e.target.value))}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Quantidade de camas"
              name="qtd_camas"
              sx={{ m: 1, width: '100%' }}
              onChange={e => setBedsNum(Number(e.target.value))}
            />
          </Box>
          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="setor">Setor</InputLabel>
            <Select labelId="setor" id="setor" onChange={e => setDepartment(e.target.value)} value={department}>
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
