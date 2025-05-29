import { LuUserRound, LuBed, LuCalendar } from 'react-icons/lu';
import styles from '../assets/styles/modules/dashboards-infos.module.css';
import { TbNurse } from 'react-icons/tb';

export const DashboardsInfos = () => {
  const options = [
    { id: 1, nome: 'Pacientes', quantidade: '5', color: '#C45AFA', icon: LuUserRound },
    { id: 2, nome: 'Quartos', quantidade: '23', color: '#33D14C', icon: LuBed },
    { id: 3, nome: 'Agendamentos', quantidade: '12', color: '#fde910', icon: LuCalendar },
    { id: 4, nome: 'Profissionais', quantidade: '10', color: '#5F58E3', icon: TbNurse },
  ];

  return (
    <div className={styles.container}>
      {options.map(item => {
        const Icon = item.icon;
        return (
          <div className={styles.item} key={item.id}>
            <div className={styles.icon} style={{ background: item.color }}>
              <Icon />
            </div>
            <div className={styles.text}>
              <p>{item.nome}</p>
              <h2>{item.quantidade}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};
