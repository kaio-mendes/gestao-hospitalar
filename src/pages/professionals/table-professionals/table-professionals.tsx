import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ItensProfessionals } from './itens-professionals';
import type { Professional } from '../types';

type TableProfessionalsProps = {
  profissionais: Professional[];
  showPacientes: (id: number, nome: string) => void;
};

export const TableProfessionals = ({ profissionais, showPacientes }: TableProfessionalsProps) => {
  return profissionais.length > 0 ? (
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
              <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Médico</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Setor</TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Pacientes</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {profissionais.map(profissional => (
              <ItensProfessionals key={profissional.id} profissional={profissional} showPacientes={showPacientes} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ) : (
    <h3 style={{ width: '100%', textAlign: 'center' }}>Sem pacientes cadastrados</h3>
  );
};
