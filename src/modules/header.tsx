import { Box } from '@mui/material';
import { Title } from '../components/title';
import { IoGrid } from 'react-icons/io5';
import { FaList } from 'react-icons/fa6';
import { useListStyle } from '../context/list-style';
import type React from 'react';

type HeaderComponentProps = {
  title: string;
};

export const HeaderComponent: React.FC<HeaderComponentProps> = ({ title }) => {
  const { isList, setIsList } = useListStyle();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Title title={title} />
      <Box sx={{ display: 'flex', fontSize: '1.2rem', color: '#999999ff', gap: 5 }}>
        <IoGrid
          style={{ cursor: 'pointer', color: isList === true ? '#3c82dfff' : '#999' }}
          onClick={() => setIsList(true)}
        />
        <FaList
          style={{ cursor: 'pointer', color: isList === false ? '#3c82dfff' : '#999' }}
          onClick={() => setIsList(false)}
        />
      </Box>
    </Box>
  );
};
