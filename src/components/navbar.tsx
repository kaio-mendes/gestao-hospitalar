import { Link, useLocation } from 'react-router-dom';
import styles from '../assets/styles/components/navbar.module.css';
import { LuBed, LuCalendarPlus2, LuClipboardPlus, LuHouse, LuStethoscope } from 'react-icons/lu';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { to: '/', icon: <LuHouse /> },
    { to: '/pacientes', icon: <LuClipboardPlus /> },
    { to: '/leitos', icon: <LuBed /> },
    { to: '/profissionais', icon: <LuStethoscope /> },
    { to: '/agendamentos', icon: <LuCalendarPlus2 /> },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.items}>
        <ul>
          {links.map(link => (
            <li key={link.to} className={path === link.to ? styles.ativo : ''}>
              <Link to={link.to}>{link.icon}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
