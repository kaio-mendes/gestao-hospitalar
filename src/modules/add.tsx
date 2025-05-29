import { Box } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

interface showModal {
  onClick?: () => void;
}
export const Add = ({ onClick }: showModal) => {
  return (
    <Box
      sx={{
        backgroundColor: '#395886',
        height: '3rem',
        width: '3rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#ffffff',
        fontSize: '1rem',
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        cursor: 'pointer',
        zIndex: 10,
      }}
      onClick={onClick}
    >
      <FaPlus />
    </Box>
  );
};
