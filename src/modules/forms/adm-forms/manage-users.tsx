import { Box, Drawer, FormControl, InputLabel, MenuItem, Modal, Select, Button } from '@mui/material';
import { useEffect, useState, type SetStateAction } from 'react';
import type React from 'react';
import { LuPen } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';
import styles from '../../../assets/styles/modules/ConfigForms/manage-users.module.css';
import axios from 'axios';

type Form = {
  form: string;
  setForm: React.Dispatch<SetStateAction<string>>;
};

type User = {
  id: number;
  name: string;
  email: string;
  tipo: string;
};

export const ManageUsers: React.FC<Form> = ({ form, setForm }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [data, setData] = useState<User[]>([]);
  const [atribuir, setAtribuir] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    async function listUser() {
      try {
        const response = await fetch(`${apiUrl}/listar-usuarios`, {
          credentials: 'include',
        });
        const responseData = await response.json();
        setData(responseData.users);
      } catch (error) {
        console.log(error);
      }
    }

    if (form) listUser();
  }, [form]);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;

    const doctorToAssign = data.find(u => u.name === atribuir);
    if (!doctorToAssign) return;

    try {
      await axios.post(
        `${apiUrl}/reatribuir-e-deletar/${selectedUser.id}`,
        { newDoctorId: doctorToAssign.id },
        { withCredentials: true }
      );

      setData(prev => prev.filter(u => u.id !== selectedUser.id));
      setShowModal(false);
      setSelectedUser(null);
      setAtribuir('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Drawer anchor="right" open={!!form} onClose={() => setForm('')}>
      <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: 600, alignItems: 'center' }}>
        <h3>Gerenciar usuários</h3>
        {data.map(usuario => (
          <div className={styles.item} key={usuario.id}>
            <h3>{usuario.name}</h3>
            <h4>{usuario.tipo}</h4>
            <div style={{ width: '4rem', display: 'flex', justifyContent: 'space-between', height: '1rem' }}>
              <MdDelete
                onClick={() => handleDeleteClick(usuario)}
                style={{ cursor: 'pointer', background: '#8087cab4', fontSize: '1.3rem' }}
              />
            </div>
          </div>
        ))}
        <Modal open={showModal} onClose={() => setShowModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 300,
            }}
          >
            <h3>Excluindo {selectedUser?.name}</h3>
            <h4>Atribuir pacientes para:</h4>
            <FormControl variant="filled" sx={{ m: 1, width: '100%' }}>
              <InputLabel id="medico">Selecionar médico</InputLabel>
              <Select labelId="medico" id="medico" value={atribuir} onChange={e => setAtribuir(e.target.value)}>
                {data
                  .filter(u => u.id !== selectedUser?.id)
                  .map(u => (
                    <MenuItem key={u.id} value={u.name}>
                      {u.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="contained" color="error" onClick={confirmDelete} disabled={!atribuir}>
                Confirmar
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Drawer>
  );
};
