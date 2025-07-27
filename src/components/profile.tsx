import React, { useContext, useEffect, useState } from 'react';
import styles from '../assets/styles/components/profile.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
import { ThemeContext } from '../providers/dark-mode';
import { isAdminContext } from '../context/is-admin-context';

type ProfileProps = {
  toogleMenu: () => void;
  menu: boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Profile: React.FC<ProfileProps> = ({ toogleMenu, menu, setMenu }) => {
  const navigate = useNavigate();
  const { isAdmin, name } = useContext(isAdminContext);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target;

      if (target instanceof HTMLElement) {
        if (!target.closest(`.${styles.container}`) && !target.closest(`.${styles.profileMenu}`)) {
          setMenu(false);
        }
      }
    }

    if (menu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menu]);

  const context = useContext(ThemeContext); //evitar erro de tipo

  if (!context) {
    throw new Error('Tipo undefine');
  }

  const { theme, toogleTheme } = context;
  const removeToken = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.informations}>
          <div className={styles.informationsItems}>
            <h4>{name}</h4>
            <p>{isAdmin ? 'admin' : 'usuário'}</p>
          </div>

          <div className={`${styles.downArrow} ${menu ? styles.active : ''}`}>
            <IoIosArrowDown onClick={toogleMenu} />
          </div>
        </div>
      </div>

      {menu && (
        <div className={styles.profileMenu}>
          {isAdmin ? <Link to="/configuracao">Configurações</Link> : ''}
          <a onClick={removeToken}>Sair</a>
          <div>
            {theme ? 'Light mode' : 'Dark mode'}
            <Switch checked={theme} onChange={toogleTheme} />
          </div>
        </div>
      )}
    </>
  );
};
