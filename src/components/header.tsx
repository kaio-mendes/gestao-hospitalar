import { useState } from 'react';
import styles from '../assets/styles/components/header.module.css';
import { Profile } from './profile';

export const Header = () => {
  const [menu, setMenu] = useState(false);
  function toogleMenu() {
    setMenu(prev => !prev);
  }

  return (
    <header className={styles.header}>
      <div className={styles.bars}>
        <p>SGHSS - Gerência Hospitalar</p>
      </div>
      <div className={styles.profile}>
        <Profile toogleMenu={toogleMenu} setMenu={setMenu} menu={menu} />
      </div>
    </header>
  );
};
