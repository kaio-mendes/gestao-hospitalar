import React, { useState } from 'react';
import { Title } from '../components/title';
import { Add } from '../modules/add';
import { Box, Button, TextField } from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';

export const Beds = () => {
  const [showModal, setShowModal] = useState(false);
  const [num, setNum] = useState('');
  function saveBed(event) {
    setNum(event.target.value);
  }

  function Newbed() {}

  return (
    <div>
      <Title title="Leitos" />
    </div>
  );
};
