import { Box, Drawer } from '@mui/material';
import { useEffect, useState, type SetStateAction } from 'react';
import type React from 'react';
import { LuPen } from 'react-icons/lu';
import axios from 'axios';
import styles from '../../../assets/styles/modules/ConfigForms/manage-users.module.css';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

type users = {
  id: number;
  name: string;
  email: string;
  admin: boolean;
};

export const ManageUsers: React.FC<Form> = ({ form, setForm }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<users[]>([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function listUser() {
      try {
        const response = await axios.get(`${apiUrl}/listar-usuarios`, {
          headers: {
            Authorization: token, //backend em roda privada precisa do token
          },
        });
        setData(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    if (form) {
      listUser();
    }
  }, [form]);
  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Gerenciar usuários</h3>

        {data.map(usuario => (
          <div className={styles.item} key={usuario.id}>
            <h3>{usuario.name}</h3>

            <LuPen />
          </div>
        ))}
      </Box>
    </Drawer>
  );
};
