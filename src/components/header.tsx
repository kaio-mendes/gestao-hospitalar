import styles from '../assets/styles/components/header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.bars}>
        <i></i>
        <p>SGHSS - Gerência Hospitalar</p>
      </div>
      <div className={styles.profile}></div>
    </header>
  );
};
