import { Button, TableCell, TableRow } from '@mui/material';
import type { Professional, Paciente } from '../types';

type ItensProfessionalsProps = {
  profissional: Professional;
  paciente?: Paciente;
  showPacientes: (id: number, nome: string) => void;
};

export const ItensProfessionals = ({ profissional, showPacientes }: ItensProfessionalsProps) => {
  return (
    <TableRow>
      <TableCell>{profissional.id}</TableCell>
      <TableCell>{profissional.name}</TableCell>
      <TableCell>{profissional.setor || 'sem setor'}</TableCell>
      <TableCell>
        <Button onClick={() => showPacientes(profissional.id, profissional.name)}>Mostrar Pacientes</Button>
      </TableCell>
    </TableRow>
  );
};
