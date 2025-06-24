import { Title } from '../components/title';
import styles from '../assets/styles/pages/config.module.css';
import { LuBed, LuDoorClosed, LuUser } from 'react-icons/lu';
import { TbNurse } from 'react-icons/tb';
import { useState } from 'react';
import { ConfigForms } from '../modules/forms/config-forms';

export const Config = () => {
  const [form, setForm] = useState('');
  const handleForm = (formName: string) => {
    setForm(formName);
  };
  return (
    <div className={styles.container}>
      <Title title="Configurações" />
      <div className={styles.items}>
        <div className={styles.new} onClick={() => handleForm('Leitos')}>
          <div className={styles.icon}>
            <LuBed fontSize={32} />
          </div>
          <p>Leitos</p>
        </div>

        <div className={styles.new} onClick={() => handleForm('Profissionais')}>
          <div className={styles.icon}>
            <TbNurse fontSize={32} />
          </div>
          <p>Profissionais</p>
        </div>

        <div className={styles.new} onClick={() => handleForm('Setores')}>
          <div className={styles.icon}>
            <LuDoorClosed fontSize={32} />
          </div>
          <p>Setores</p>
        </div>

        <div className={styles.new} onClick={() => handleForm('Usuarios')}>
          <div className={styles.icon}>
            <LuUser fontSize={32} />
          </div>
          <p>Usuários</p>
        </div>
      </div>
      {form && <ConfigForms form={form} setForm={setForm} />}
    </div>
  );
};
