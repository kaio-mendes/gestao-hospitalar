import {
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormControl,
  Button,
  Drawer,
  Box,
  type SelectChangeEvent,
} from '@mui/material';
import styles from '../../assets/styles/modules/forms.module.css';
import React, { useEffect, useState, type SetStateAction } from 'react';
import axios from 'axios';

type PatientsProps = {
  toogleForm: () => void;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
};

type FormData = {
  nome: string;
  cpf: string;
  data_nascimento: string;
  idade: number;
  genero: string;
  estado_civil: string;
  telefone: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  nome_emergencia: string;
  telefone_emergencia: string;
  endereco_emergencia: string;
  medicoResponsavelId: number | null;
};

type Professional = {
  id: number;
  name: string;
};

export const PatientsForm: React.FC<PatientsProps> = ({ setShowForm, showForm }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState<FormData>({
    nome: '',
    cpf: '',
    data_nascimento: '',
    idade: 0,
    genero: '',
    estado_civil: '',
    telefone: '',
    endereco: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    nome_emergencia: '',
    telefone_emergencia: '',
    endereco_emergencia: '',
    medicoResponsavelId: null,
  });
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    async function showProfessionals() {
      try {
        const response = await axios.get(`${apiUrl}/profissionais`, { withCredentials: true });
        setProfessionals(response.data.professionals);
      } catch (error) {
        console.error('Erro ao carregar profissionais:', error);
        alert('Erro ao carregar profissionais. Tente novamente.');
      }
    }
    showProfessionals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'data_nascimento') {
      const age = calculateAge(value);

      setFormData(prev => ({
        ...prev,
        data_nascimento: value,
        idade: age,
      }));
    } else if (name === 'idade') {
      setFormData(prev => ({
        ...prev,
        idade: Number(value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateAge = (birthDateString: string): number => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 0 ? age : 0;
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name === 'idade' ? Number(value) : value,
    }));
  };

  const handleMedicoSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      medicoResponsavelId: value ? Number(value) : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const dataToSend = { ...formData, idade: Number(formData.idade) };

      const response = await axios.post(`${apiUrl}/pacientes`, dataToSend, { withCredentials: true });

      setShowForm(false);
      setFormData({
        nome: '',
        cpf: '',
        data_nascimento: '',
        idade: 0,
        genero: '',
        estado_civil: '',
        telefone: '',
        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        nome_emergencia: '',
        telefone_emergencia: '',
        endereco_emergencia: '',
        medicoResponsavelId: null,
      });
    } catch (error) {
      console.error('Erro ao criar paciente:', error);
      alert('Erro ao salvar paciente. Tente novamente.');
    }
  };

  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600 }}>
        <h3>Cadastro de Paciente</h3>

        <form className={styles.forms} onSubmit={handleSubmit}>
          {/* Seção: Paciente */}
          <label>Paciente:</label>
          <div className={styles.flex}>
            <TextField
              fullWidth
              variant="filled"
              label="Nome"
              name="nome"
              sx={{ m: 1, width: '50%' }}
              value={formData.nome}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="CPF"
              name="cpf"
              sx={{ m: 1, width: '30%' }}
              value={formData.cpf}
              onChange={handleChange}
            />
            <TextField
              variant="filled"
              label="Nascimento"
              name="data_nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ m: 1 }}
              value={formData.data_nascimento}
              onChange={handleChange}
            />
          </div>

          <div className={styles.flexCenter}>
            <TextField
              variant="filled"
              label="Idade"
              name="idade"
              type="number"
              InputProps={{
                readOnly: true,
              }}
              sx={{ m: 1, width: '15%' }}
              value={formData.idade}
            />
            <FormControl variant="filled" sx={{ m: 1, width: '20%' }}>
              <InputLabel id="gender-label">Gênero</InputLabel>
              <Select labelId="gender-label" name="genero" value={formData.genero} onChange={handleSelectChange}>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="PND">Prefiro não dizer</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, width: '25%' }}>
              <InputLabel id="estado-civil-label">Estado Civil</InputLabel>
              <Select
                labelId="estado-civil-label"
                name="estado_civil"
                value={formData.estado_civil}
                onChange={handleSelectChange}
              >
                <MenuItem value="casado">Casado(a)</MenuItem>
                <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                <MenuItem value="amasiado">Amasiado(a)</MenuItem>
                <MenuItem value="viuvo">Viúvo(a)</MenuItem>
                <MenuItem value="outros">Outros</MenuItem>
              </Select>
            </FormControl>
          </div>

          {/* Seção: Endereço */}
          <label>Endereço:</label>
          <div className={styles.flex}>
            <TextField
              fullWidth
              variant="filled"
              label="Telefone"
              name="telefone"
              sx={{ m: 1, width: '30%' }}
              value={formData.telefone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Endereço"
              name="endereco"
              sx={{ m: 1 }}
              value={formData.endereco}
              onChange={handleChange}
            />
          </div>

          <div className={styles.flex}>
            <TextField
              fullWidth
              variant="filled"
              label="Bairro"
              name="bairro"
              sx={{ m: 1 }}
              value={formData.bairro}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Cidade"
              name="cidade"
              sx={{ m: 1 }}
              value={formData.cidade}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Estado"
              name="estado"
              sx={{ m: 1 }}
              value={formData.estado}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="CEP"
              name="cep"
              sx={{ m: 1 }}
              value={formData.cep}
              onChange={handleChange}
            />
          </div>

          {/* Seção: Contato de Emergência */}
          <label>Contato de Emergência:</label>
          <div>
            <TextField
              fullWidth
              variant="filled"
              label="Nome"
              name="nome_emergencia"
              sx={{ m: 1, width: '100%' }}
              value={formData.nome_emergencia}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Telefone de Emergência"
              name="telefone_emergencia"
              sx={{ m: 1, width: '100%' }}
              value={formData.telefone_emergencia}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Endereço"
              name="endereco_emergencia"
              sx={{ m: 1 }}
              value={formData.endereco_emergencia}
              onChange={handleChange}
            />
          </div>
          <FormControl variant="filled" sx={{ m: 1, width: '100%' }}>
            <InputLabel id="medico-label">Médico</InputLabel>
            <Select
              labelId="medico-label"
              name="medicoResponsavelId"
              value={formData.medicoResponsavelId?.toString() ?? ''}
              onChange={handleMedicoSelectChange}
            >
              {professionals.map(professional => (
                <MenuItem key={professional.id} value={professional.id.toString()}>
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
