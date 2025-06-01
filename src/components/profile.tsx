import React, { useEffect, useState } from 'react';
import styles from '../assets/styles/components/profile.module.css';
import { IoIosArrowDown } from 'react-icons/io';

export const Profile: React.FC = () => {
  const [menu, setMenu] = useState(false);

  function toogleMenu() {
    setMenu(prev => !prev);
  }

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
      <div className={styles.container} onClick={toogleMenu}>
        <div className={styles.img}>
          <img src="https://wallpapers-clan.com/wp-content/uploads/2022/05/meme-pfp-42.jpg" />
        </div>
        <div className={styles.informations}>
          <div className={styles.informationsItems}>
            <h3>Name</h3>
            <p>Admin</p>
          </div>

          <div className={`${styles.downArrow} ${menu ? styles.active : ''}`}>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
      {menu && (
        <div className={styles.profileMenu}>
          <button>Configurações</button>
          <button>Sair</button>
        </div>
      )}
    </>
  );
};
