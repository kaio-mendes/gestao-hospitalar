import React, { useContext, useEffect, useState } from 'react';
import { Add } from '../../modules/add.tsx';
import { PatientsForm } from '../../modules/forms/patients-form.tsx';
import { AgendarConsulta } from '../../modules/forms/agendar-consulta.tsx';
import { Box } from '@mui/material';
import axios from 'axios';
import { isAdminContext } from '../../context/is-admin-context.tsx';
import { HistoricoConsultas } from '../../modules/forms/historico-consultas.tsx';
import { HeaderComponent } from '../../modules/header.tsx';
import { useListStyle } from '../../context/list-style.tsx';
import { TablePatients } from './table-patients/table-patients.tsx';
import { GridPatients } from './grid-patients/grid-patients.tsx';
import type { Paciente } from './types.tsx';

export const Patients: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const { isAdmin } = useContext(isAdminContext);
  const { isList } = useListStyle();
  const apiUrl = import.meta.env.VITE_API_URL;

  const toogleForm = () => setShowForm(prev => !prev);

  useEffect(() => {
    async function showPacientes() {
      const response = await axios.get(`${apiUrl}/pacientes`, { withCredentials: true });
      setPacientes(response.data.pacientes);
    }
    showPacientes();
  }, []);

  const abrirAgendamento = (paciente: Paciente) => setPacienteSelecionado(paciente);
  const fecharAgendamento = () => setPacienteSelecionado(null);

  return isAdmin === 'medico' ? (
    <HistoricoConsultas pacientes={pacientes} />
  ) : (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 4, padding: '2rem' }}>
      <HeaderComponent title="Pacientes" />
      {isList ? (
        <GridPatients pacientes={pacientes} abrirAgendamento={abrirAgendamento} />
      ) : (
        <TablePatients pacientes={pacientes} abrirAgendamento={abrirAgendamento} />
      )}
      {pacienteSelecionado && <AgendarConsulta paciente={pacienteSelecionado} setAgendar={fecharAgendamento} />}
      {isAdmin !== 'medico' && (
        <>
          <Add onClick={toogleForm} />
          {showForm && <PatientsForm setShowForm={setShowForm} toogleForm={toogleForm} showForm={showForm} />}
        </>
      )}
    </Box>
  );
};
