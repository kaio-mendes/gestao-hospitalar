import React, { useEffect } from 'react';
import styles from '../assets/styles/components/profile.module.css';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';

type ProfileProps = {
  toogleMenu: () => void;
  menu: Boolean;
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Profile: React.FC<ProfileProps> = ({ toogleMenu, menu, setMenu }) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!event.target.closest(`.${styles.container}`)) {
        setMenu(false);
      }
    }

    if (menu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [menu]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.img}>
          <img src="https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-42.jpg" />
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
        </div>
      )}
    </>
  );
};
