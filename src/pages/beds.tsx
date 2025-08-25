import { LuPlus } from 'react-icons/lu';
import styles from '../assets/styles/pages/beds.module.css';
import { Title } from '../components/title';
import { useEffect, useState } from 'react';
import { BedForm } from '../modules/forms/bed-form';
import axios from 'axios';

type Paciente = {
  id: number;
  pacientes: string;
};

type Setor = {
  id: number;
  nome: string;
};
export const Beds = () => {
  const [showForm, setShowForm] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [setor, setSetor] = useState<Setor[]>([]);
  function toogleForm() {
    setShowForm(prev => !prev);
  }
  useEffect(() => {
    async function showPacientes() {
      const response = await axios.get(`${apiUrl}/pacientes`, { withCredentials: true });
      const setor = await axios.get(`${apiUrl}/listar-departamentos`, { withCredentials: true });
      setPacientes(response.data.pacientes);
      setSetor(setor.data.department);
    }
    showPacientes();
  }, []);
  return (
    <div className={styles.container}>
      <Title title="Leitos" />
      <div className={styles.items}>
        <div className={styles.newbed} onClick={toogleForm}>
          <LuPlus />
        </div>
      </div>
      {showForm ? <BedForm showForm={showForm} setShowForm={setShowForm} pacientes={pacientes} setor={setor} /> : ''}
    </div>
  );
};
