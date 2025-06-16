import { LuPlus } from 'react-icons/lu';
import styles from '../assets/styles/pages/beds.module.css';
import { Title } from '../components/title';
import { useState } from 'react';
import { BedForm } from '../modules/forms/bed-form';

export const Beds = () => {
  const [showForm, setShowForm] = useState(false);
  function toogleForm() {
    setShowForm(prev => !prev);
  }
  return (
    <div className={styles.container}>
      <Title title="Leitos" />
      <div className={styles.items}>
        <div className={styles.newbed} onClick={toogleForm}>
          <LuPlus />
        </div>
      </div>
      {showForm ? <BedForm showForm={showForm} setShowForm={setShowForm} /> : ''}
    </div>
  );
};
