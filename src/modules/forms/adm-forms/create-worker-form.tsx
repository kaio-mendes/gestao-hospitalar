import { Box, Button, Drawer, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState, type SetStateAction } from 'react';
import type React from 'react';
import { FetchFormPost } from '../../../context/fetch-form-post';
import axios from 'axios';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};
type Department = {
  id: number;
  name: string;
};

export const CreateWorker: React.FC<Form> = ({ form, setForm }) => {
  const { PostForm } = FetchFormPost();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [departments, setDepartments] = useState<Department[]>([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [setor, setSetor] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('');
  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await axios.get(apiUrl + '/listar-departamentos', { withCredentials: true });
        setDepartments(response.data.department);
      } catch (error) {
        console.error('Erro ao carregar departamentos:', error);
      }
    }
    fetchDepartments();
  }, []);

  async function PostWorker() {
    try {
      await PostForm('/cadastro', {
        name: nome,
        email,
        password: senha,
        tipo: tipoUsuario,
        setor,
      });
      setNome('');
      setEmail('');
      setSenha('');
      setSetor('');
      setTipoUsuario('');
      setForm('');
    } catch (error) {
      console.error('Erro ao postar:', error);
    }
  }

  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Cadastro de Profissionais</h3>
        <form
          style={{ width: '100%', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
          onSubmit={e => {
            e.preventDefault();
            PostWorker();
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            label="Nome do Usuário"
            name="NomeProfissional"
            sx={{ m: 1, width: '100%' }}
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <TextField
            fullWidth
            variant="filled"
            label="Email"
            name="Email"
            sx={{ m: 1, width: '100%' }}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            variant="filled"
            label="Senha"
            name="senha"
            sx={{ m: 1, width: '100%' }}
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="tipo">Tipo de usuário</InputLabel>
            <Select value={tipoUsuario} onChange={e => setTipoUsuario(e.target.value)}>
              <MenuItem value="medico">Medico</MenuItem>
              <MenuItem value="secretario">Secretário</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="filled" sx={{ m: 1, width: 300 }}>
            <InputLabel id="setor">Setor</InputLabel>
            <Select value={setor} onChange={e => setSetor(e.target.value)} displayEmpty>
              <MenuItem value="" disabled>
                Selecione um setor
              </MenuItem>
              {departments.map(department => (
                <MenuItem key={department.id} value={department.name}>
                  {department.name}
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
