import { InputLabel, MenuItem, Select, TextField, FormControl, Button, Drawer } from '@mui/material';
import styles from '../../assets/styles/modules/forms.module.css';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

type PatientsProps = {
  toogleForm: () => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  showForm: Boolean;
};

export const PatientsForm: React.FC<PatientsProps> = ({ toogleForm, setShowForm, showForm }) => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event: any) => {
    setGender(event.target.value);
  };

  return (
    <Drawer anchor="right" open={showForm} onClose={() => setShowForm(false)}>
      <div className={styles.flex} style={{ justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <h1>Cadastro de paciente:</h1>

        <MdClose onClick={toogleForm} className={styles.close} />
      </div>
      <form className={styles.forms}>
        <div className={styles.flex}>
          <TextField fullWidth variant="filled" label="Nome" sx={{ m: 1, width: '50%' }} />
          <TextField fullWidth variant="filled" label="CPF" sx={{ m: 1, width: '30%' }} />
          <TextField variant="filled" label="Nascimento" type="date" InputLabelProps={{ shrink: true }} sx={{ m: 1 }} />
        </div>

        <div className={styles.flexCenter}>
          <TextField variant="filled" label="Idade" sx={{ m: 1, width: '10%' }} />
          <FormControl variant="filled" sx={{ m: 1, width: '15%' }}>
            <InputLabel id="gender-label">Gênero</InputLabel>
            <Select labelId="gender-label" id="gender" value={gender} onChange={handleGenderChange}>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="PND">Prefiro não dizer</MenuItem>
            </Select>
          </FormControl>
          <TextField variant="filled" label="Contato de emergência" sx={{ m: 1, width: '20%' }} />
          <TextField variant="filled" label="Telefone de emergência" sx={{ m: 1, width: '20%' }} />
          <FormControl variant="filled" sx={{ m: 1, width: '15%' }}>
            <InputLabel id="estado-label">Estado Civil</InputLabel>
            <Select labelId="estado-label" id="estado">
              <MenuItem value="casado">Casado(a)</MenuItem>
              <MenuItem value="solteiro">Solteiro(a)</MenuItem>
              <MenuItem value="amasiado">Amasiado(a)</MenuItem>
              <MenuItem value="viuvo">Viúvo(a)</MenuItem>
              <MenuItem value="outros">Outros</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={styles.flex}>
          <TextField fullWidth variant="filled" label="Telefone" sx={{ m: 1, width: '30%' }} />
          <TextField fullWidth variant="filled" label="Endereço" sx={{ m: 1 }} />
        </div>

        <div className={styles.flex}>
          <TextField fullWidth variant="filled" label="Bairro" sx={{ m: 1 }} />
          <TextField fullWidth variant="filled" label="Cidade" sx={{ m: 1 }} />
          <TextField fullWidth variant="filled" label="Estado" sx={{ m: 1 }} />
          <TextField fullWidth variant="filled" label="CEP" sx={{ m: 1 }} />
        </div>
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Salvar
        </Button>
      </form>
    </Drawer>
  );
};
