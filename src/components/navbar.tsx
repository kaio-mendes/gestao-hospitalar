import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/styles/components/navbar.module.css';
import { LuBed, LuCalendarPlus2, LuClipboardPlus, LuHouse, LuStethoscope } from 'react-icons/lu';
import { FaGear } from 'react-icons/fa6';
import { useContext, useState } from 'react';
import { Switch } from '@mui/material';
import { ThemeContext } from '../providers/dark-mode';
import { isAdminContext } from '../context/is-admin-context';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const [menu, setMenu] = useState(false);
  const { isAdmin, name } = useContext(isAdminContext);

  function toogleMenu() {
    setMenu(prev => !prev);
  }
  const apiUrl = import.meta.env.VITE_API_URL;

  const links = [
    { to: '/dashboard', icon: <LuHouse /> },
    { to: '/pacientes', icon: <LuClipboardPlus /> },
    { to: '/leitos', icon: <LuBed /> },
    ...(isAdmin !== 'medico' ? [{ to: '/profissionais', icon: <LuStethoscope /> }] : []),
    { to: '/agendamentos', icon: <LuCalendarPlus2 /> },
  ];
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('Tipo undefine');
  }
  const { theme, toogleTheme } = context;

  const removeToken = () => {
    fetch(`${apiUrl}/logout`);
    navigate('/');
  };

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
          {isAdmin === 'admin' ? <Link to="/configuracao">Configurações</Link> : ''}
          <button onClick={removeToken}>Sair</button>
          <div>
            Dark Mode
            <Switch onChange={toogleTheme} />
          </div>
        </div>
      )}
    </nav>
  );
};
