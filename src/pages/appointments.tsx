import { Box } from '@mui/material';
import { Title } from '../components/title';
import { Calendar } from '../modules/calendar';

export const Appointments = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Title title="Agendamentos" />
      <Box sx={{ margin: '0.5rem', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <Calendar />
      </Box>
    </Box>
  );
};
