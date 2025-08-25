import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
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
type Alldepartments = {
  id: number;
  name: string;
  head?: string;
};
export const CreateSector: React.FC<Form> = ({ form, setForm }) => {
  const [name, setName] = useState('');
  const [head, setHead] = useState<number | ''>('');
  const { PostForm } = FetchFormPost();
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [departments, setDepartments] = useState<Alldepartments[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(apiUrl + '/listar-usuarios', { withCredentials: true });
        const department = await axios.get(apiUrl + '/listar-departamentos', { withCredentials: true });
        setProfessionals(response.data.users);
        setDepartments(department.data.department);
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
          height: '100%',
          width: { xs: '100%', sm: 500, md: 600 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start', // ou 'center' se quiser tudo ao centro
          padding: 2,
          gap: 4,
          overflowY: 'auto',
        }}
      >
        {/* Formulário */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f9f9f9',
            padding: 3,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cadastro de Setores
          </Typography>
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

            <FormControl variant="filled" sx={{ m: 1, width: '100%' }}>
              <InputLabel id="setor">Chefe do setor</InputLabel>
              <Select labelId="setor" id="setor" onChange={e => setHead(e.target.value)} value={head}>
                {professionals.map(professional => (
                  <MenuItem key={professional.id} value={professional.name}>
                    {professional.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                Salvar
              </Button>
            </Box>
          </form>
        </Box>

        {/* Lista de departamentos */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {departments.map(department => (
            <Paper
              key={department.id}
              elevation={2}
              sx={{
                width: '100%',
                mb: 2,
                p: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            >
              <Stack direction="column">
                <Typography variant="subtitle1" fontWeight="bold">
                  {department.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {department.id}
                </Typography>
              </Stack>
              <Typography variant="body1">{department.head ? department.head : 'Sem responsável'}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};
