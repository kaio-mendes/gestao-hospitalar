import { Link, useLocation } from 'react-router-dom';
import styles from '../assets/styles/components/navbar.module.css';
import { LuBed, LuCalendarPlus2, LuClipboardPlus, LuHouse, LuStethoscope } from 'react-icons/lu';
import { FaGear } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { Switch } from '@mui/material';
import { ThemeContext } from '../providers/dark-mode';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  const [menu, setMenu] = useState(false);

  function toogleMenu() {
    setMenu(prev => !prev);
  }
  const links = [
    { to: '/', icon: <LuHouse /> },
    { to: '/pacientes', icon: <LuClipboardPlus /> },
    { to: '/leitos', icon: <LuBed /> },
    { to: '/profissionais', icon: <LuStethoscope /> },
    { to: '/agendamentos', icon: <LuCalendarPlus2 /> },
  ];
  const { theme, toogleTheme } = useContext(ThemeContext);

  return (
    <nav className={styles.navbar} style={{ backgroundColor: theme ? '#191919' : '#ffffff' }}>
      <div className={styles.items}>
        <ul>
          {links.map(link => (
            <li key={link.to} className={path === link.to ? styles.ativo : ''}>
              <Link to={link.to}>{link.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.userMenu}>
        <a>
          <FaGear onClick={toogleMenu} />
        </a>
      </div>
      {menu && (
        <div className={styles.profileMenu}>
          <Link to="/configuracao">Configurações</Link>
          <button>Sair</button>
          <div>
            Dark Mode
            <Switch onChange={toogleTheme} />
          </div>
        </div>
      )}
    </nav>
  );
};
