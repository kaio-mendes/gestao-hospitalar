import { Button, TableCell, TableRow } from '@mui/material';
import type { Paciente } from '../types';
import { MdDelete } from 'react-icons/md';

type TablePatientsProps = {
  deletePaciente: (id: number) => void;
  paciente: Paciente;
  abrirAgendamento: (paciente: Paciente) => void;
};

export const ItensPatients = ({ paciente, abrirAgendamento, deletePaciente }: TablePatientsProps) => {
  return (
    <TableRow>
      <TableCell>{paciente.id}</TableCell>
      <TableCell>{paciente.nome}</TableCell>
      <TableCell>{paciente.medicoResponsavel?.name || '-'}</TableCell>
      <TableCell>
        <Button color="primary" variant="contained" onClick={() => abrirAgendamento(paciente)}>
          Consulta
        </Button>
      </TableCell>
      <TableCell style={{ width: '100%', textAlign: 'center', fontSize: '1.2rem' }}>
        <MdDelete style={{ background: '#8087ca18', cursor: 'pointer' }} onClick={() => deletePaciente(paciente.id)} />
      </TableCell>
    </TableRow>
  );
};
