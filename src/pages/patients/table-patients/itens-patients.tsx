import { Button, TableCell, TableRow } from '@mui/material';
import type { Paciente } from '../types';

type TablePatientsProps = {
  paciente: Paciente;
  abrirAgendamento: (paciente: Paciente) => void;
};

export const ItensPatients = ({ paciente, abrirAgendamento }: TablePatientsProps) => {
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
    </TableRow>
  );
};
