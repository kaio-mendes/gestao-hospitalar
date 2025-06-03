import { useState } from 'react';
import { Title } from '../components/title';
import { Add } from '../modules/add';
import { PatientsForm } from '../modules/forms/patients-form';

export const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  function toogleForm() {
    setShowForm(prev => !prev);
  }
  return (
    <div>
      <Title title="Pacientes" />
      <Add onClick={toogleForm} />
      {showForm ? <PatientsForm setShowForm={setShowForm} toogleForm={toogleForm} showForm={showForm} /> : ''}
    </div>
  );
};
