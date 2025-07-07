import { InputLabel, MenuItem, Select, TextField, FormControl, Button, Drawer, Box } from '@mui/material';
import styles from '../../assets/styles/modules/forms.module.css';
import React, { useState, type SetStateAction } from 'react';

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
};

export const PatientsForm: React.FC<PatientsProps> = ({ setShowForm, showForm }) => {
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
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(formData);
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
              sx={{ m: 1, width: '15%' }}
              value={formData.idade}
              onChange={handleChange}
            />
            <FormControl variant="filled" sx={{ m: 1, width: '20%' }}>
              <InputLabel id="gender-label">Gênero</InputLabel>
              <Select labelId="gender-label" name="genero" value={formData.genero} onChange={handleChange}>
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
                onChange={handleChange}
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
