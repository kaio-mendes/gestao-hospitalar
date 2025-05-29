import { Title } from '../components/title';
import { DashboardsInfos } from '../modules/dashboards-infos';
import styles from '../assets/styles/pages/home.module.css';
export const HomePage = () => {
  return (
    <div className={styles.dahsboard}>
      <Title title="Dashboard" />
      <DashboardsInfos />
    </div>
  );
};
