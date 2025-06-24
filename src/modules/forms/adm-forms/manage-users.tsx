import { Box, Drawer } from '@mui/material';
import type { SetStateAction } from 'react';
import type React from 'react';
import { LuPen } from 'react-icons/lu';
import styles from '../../../assets/styles/modules/ConfigForms/manage-users.module.css';
type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

export const ManageUsers: React.FC<Form> = ({ form, setForm }) => {
  const users = [
    { id: 0, nome: 'João', ocupacao: 'Cardiologista', status: 'Ativo' },
    { id: 1, nome: 'Kaio', ocupacao: 'Clinico Geral', status: 'Inativo' },
    { id: 2, nome: 'Marina', ocupacao: 'Neurologista', status: 'Ativo' },
  ];
  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Gerenciar usuários</h3>

        {users.map(usuario => (
          <div className={styles.item} key={usuario.id}>
            <h3>{usuario.nome}</h3>

            <LuPen />
          </div>
        ))}
      </Box>
    </Drawer>
  );
};
