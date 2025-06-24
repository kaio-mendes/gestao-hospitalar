import React, { useContext, useEffect } from 'react';
import styles from '../assets/styles/components/profile.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';
import { ThemeContext } from '../providers/dark-mode';

type ProfileProps = {
  toogleMenu: () => void;
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Profile: React.FC<ProfileProps> = ({ toogleMenu, menu, setMenu }) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!event.target.closest(`.${styles.container}`) && !event.target.closest(`.${styles.profileMenu}`)) {
        setMenu(false);
      }
    }

    if (menu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [menu]);

  const { theme, setTheme, toogleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="https://i.pinimg.com/474x/37/a7/1f/37a71fd7b1fe8c0e3d3102987ab00483.jpg" />
        </div>
        <div className={styles.informations}>
          <div className={styles.informationsItems}>
            <h3>Name</h3>
            <p>Admin</p>
          </div>

          <div className={`${styles.downArrow} ${menu ? styles.active : ''}`}>
            <IoIosArrowDown onClick={toogleMenu} />
          </div>
        </div>
      </div>
      {menu && (
        <div className={styles.profileMenu}>
          <Link to="/configuracao">Configurações</Link>
          <a>Sair</a>
          <div>
            {theme ? 'Light mode' : 'Dark mode'}
            <Switch checked={theme} onChange={toogleTheme} />
          </div>
        </div>
      )}
    </>
  );
};
