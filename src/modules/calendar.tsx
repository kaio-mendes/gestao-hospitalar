import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { Box } from '@mui/material';
import { useState } from 'react';

export const Calendar = () => {
  dayjs.locale('pt-br');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  return (
    <Box sx={{ backgroundColor: '#ffffff', borderRadius: '25px', border: '2px solid #eeeeee' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box>
          <DateCalendar value={selectedDate} onChange={newValue => setSelectedDate(newValue)} />
        </Box>
      </LocalizationProvider>
    </Box>
  );
};
