import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ItensPatients } from './itens-patients';
import type { Paciente } from '../types';

type TablePatientsProps = {
  deletePaciente: (id: number) => void;
  pacientes: Paciente[];
  abrirAgendamento: (paciente: Paciente) => void;
};

export const TablePatients = ({ pacientes, abrirAgendamento, deletePaciente }: TablePatientsProps) => {
  return pacientes.length > 0 ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        mt: 4,
      }}
    >
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Id</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Pacientes</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Médicos</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Agendar Consulta</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '5%', textAlign: 'center' }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pacientes.map(paciente => (
              <ItensPatients
                paciente={paciente}
                key={paciente.id}
                abrirAgendamento={abrirAgendamento}
                deletePaciente={deletePaciente}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <h3 style={{ width: '100%', textAlign: 'center' }}>Sem pacientes cadastrados</h3>
  );
};
