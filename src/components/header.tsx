import styles from '../assets/styles/components/header.module.css';
import { Profile } from './profile';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.bars}>
        <p>SGHSS - Gerência Hospitalar</p>
      </div>
      <div className={styles.profile}>
        <Profile />
      </div>
    </header>
  );
};
