import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { ModalComponent } from './modal';
import { useListStyle } from '../../context/list-style';
import { GridProfessionals } from './grid-professionals/grid-professionals';
import { TableProfessionals } from './table-professionals/table-professionals';
import { HeaderComponent } from '../../modules/header';

export type Professional = {
  id: number;
  name: string;
  tipo: string;
  setor: string;
};

type Paciente = {
  id: number;
  nome: string;
  idade: number;
};

export const Professionals = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [profissionais, setProfissionais] = useState<Professional[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicoNome, setMedicoNome] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const { isList } = useListStyle();

  useEffect(() => {
    async function showProfessionals() {
      const response = await axios.get(`${apiUrl}/profissionais`, { withCredentials: true });
      setProfissionais(response.data.professionals);
    }
    showProfessionals();
  }, []);

  const showPacientes = async (idMedico: number, nome: string) => {
    try {
      const response = await axios.get(`${apiUrl}/profissionais/${idMedico}/pacientes`, { withCredentials: true });
      setPacientes(response.data.pacientes);
      setMedicoNome(nome);
      setShowModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '2rem' }}>
      <HeaderComponent title="Profissionais" />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {isList ? (
          <GridProfessionals profissionais={profissionais} showPacientes={showPacientes} />
        ) : (
          <TableProfessionals profissionais={profissionais} showPacientes={showPacientes} />
        )}
      </Box>
      {showModal ? (
        <ModalComponent
          setShowModal={setShowModal}
          showModal={showModal}
          medicoNome={medicoNome}
          pacientes={pacientes}
        />
      ) : null}
    </Box>
  );
};
