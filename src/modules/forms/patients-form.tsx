import { InputLabel, MenuItem, Select, TextField, FormControl, Button, Drawer, Box } from '@mui/material';
import styles from '../../assets/styles/modules/forms.module.css';
import React, { type SetStateAction } from 'react';

type PatientsProps = {
  toogleForm: () => void;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  showForm: boolean;
};

export const PatientsForm: React.FC<PatientsProps> = ({ setShowForm, showForm }) => {
  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600 }}>
        <h3>Cadastro de Paciente</h3>

        <form className={styles.forms}>
          {/* Seção: Paciente */}
          <label>Paciente:</label>
          <div className={styles.flex}>
            <TextField fullWidth variant="filled" label="Nome" name="nome" sx={{ m: 1, width: '50%' }} />
            <TextField fullWidth variant="filled" label="CPF" name="cpf" sx={{ m: 1, width: '30%' }} />
            <TextField
              variant="filled"
              label="Nascimento"
              name="nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ m: 1 }}
            />
          </div>

          <div className={styles.flexCenter}>
            <TextField variant="filled" label="Idade" name="idade" sx={{ m: 1, width: '15%' }} />
            <FormControl variant="filled" sx={{ m: 1, width: '20%' }}>
              <InputLabel id="gender-label">Gênero</InputLabel>
              <Select labelId="gender-label" name="genero">
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
                <MenuItem value="PND">Prefiro não dizer</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="filled" sx={{ m: 1, width: '25%' }}>
              <InputLabel id="estado-civil-label">Estado Civil</InputLabel>
              <Select labelId="estado-civil-label" name="estadoCivil">
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
            <TextField fullWidth variant="filled" label="Telefone" name="telefone" sx={{ m: 1, width: '30%' }} />
            <TextField fullWidth variant="filled" label="Endereço" name="endereco" sx={{ m: 1 }} />
          </div>

          <div className={styles.flex}>
            <TextField fullWidth variant="filled" label="Bairro" name="bairro" sx={{ m: 1 }} />
            <TextField fullWidth variant="filled" label="Cidade" name="cidade" sx={{ m: 1 }} />
            <TextField fullWidth variant="filled" label="Estado" name="estado" sx={{ m: 1 }} />
            <TextField fullWidth variant="filled" label="CEP" name="cep" sx={{ m: 1 }} />
          </div>

          {/* Seção: Contato de Emergência */}
          <label>Contato de Emergência:</label>
          <div>
            <TextField fullWidth variant="filled" label="Nome" name="contatoEmergencia" sx={{ m: 1, width: '100%' }} />
            <TextField
              fullWidth
              variant="filled"
              label="Telefone de Emergência"
              name="telefoneEmergencia"
              sx={{ m: 1, width: '100%' }}
            />
            <TextField fullWidth variant="filled" label="Endereço" name="enderecoEmergencia" sx={{ m: 1 }} />
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
