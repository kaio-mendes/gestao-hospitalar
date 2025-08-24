import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState, type SetStateAction } from 'react';
import type React from 'react';
import { FetchFormPost } from '../../../context/fetch-form-post';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};
type Professional = {
  id: number;
  name: string;
};
export const CreateSector: React.FC<Form> = ({ form, setForm }) => {
  const [name, setName] = useState('');
  const [head, setHead] = useState<number | ''>('');
  const { PostForm } = FetchFormPost();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(apiUrl + '/listar-usuarios', { withCredentials: true });
        setProfessionals(response.data.users);
      } catch (err) {
        console.log('erro ao recuperar usuarios');
      }
    }
    getUser();
  }, []);

  async function PostDepartment() {
    try {
      await PostForm('/novo-setor', { name, head });
      setName('');
      setHead('');
      setForm('');
    } catch {
      console.log('Erro ao postar');
    }
  }

  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', sm: 500, md: 600 },
          alignItems: 'center',
        }}
      >
        <h3>Cadastro de Setores</h3>
        <form
          style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
          onSubmit={e => {
            e.preventDefault();
            PostDepartment();
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            label="Nome do Setor"
            name="name"
            sx={{ m: 1, width: '100%' }}
            onChange={e => setName(e.target.value)}
          />

          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="setor">Chefe do setor</InputLabel>
            <Select labelId="setor" id="setor" onChange={e => setHead(e.target.value)} value={head}>
              {professionals.map(professional => (
                <MenuItem key={professional.id} value={professional.name}>
                  {professional.name}
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
