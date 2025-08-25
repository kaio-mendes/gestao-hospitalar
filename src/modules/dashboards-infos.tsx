import { LuUserRound, LuBed, LuCalendar } from 'react-icons/lu';
import styles from '../assets/styles/modules/dashboards-infos.module.css';
import { TbNurse } from 'react-icons/tb';
import { isAdminContext } from '../context/is-admin-context';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const DashboardsInfos = () => {
  const { isAdmin, name } = useContext(isAdminContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const [pacientes, setPacientes] = useState(0);
  const [agendamentos, setAgendamentos] = useState(0);
  const [profissionais, setProfissionais] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const pacResponse = await axios.get(`${apiUrl}/pacientes`, { withCredentials: true });
        const agendamentoResponse = await axios.get(`${apiUrl}/agendamento`, { withCredentials: true });

        setPacientes(pacResponse.data.pacientes.length);
        setAgendamentos(agendamentoResponse.data.agendamentos.length);

        if (isAdmin !== 'medico') {
          const profResponse = await axios.get(`${apiUrl}/profissionais`, { withCredentials: true });
          setProfissionais(profResponse.data.professionals.length);
        }
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiUrl, isAdmin]);

  const options = [
    { id: 1, nome: 'Pacientes', quantidade: pacientes, color: '#C45AFA', icon: LuUserRound },
    { id: 2, nome: 'Quartos', quantidade: 'Fazer  ', color: '#33D14C', icon: LuBed },
    { id: 3, nome: 'Agendamentos', quantidade: agendamentos, color: '#fde910', icon: LuCalendar },
    ...(isAdmin != 'medico'
      ? [{ id: 4, nome: 'Profissionais', quantidade: profissionais, color: '#5F58E3', icon: TbNurse }]
      : []),
  ];

  if (loading) {
    return (
      <div className={styles.container}>
        <p>Carregando...</p>
      </div>
    );
  }
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
