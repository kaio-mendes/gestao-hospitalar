import { TextField } from '@mui/material';
import styles from '../../assets/styles/pages/auth/login.module.css';
import loginImage from '../../assets/images/doctor-login.svg';
import logo from '../../assets/images/logo.jpg';

export const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <img src={loginImage} />
      </div>
      <div className={styles.content}>
        <form>
          <div className={styles.align}>
            <div className={styles.logo}>
              <img src={logo} />
            </div>
            <h2>SGHSS - Gerência Hospitalar</h2>
          </div>

          <h3>Entre</h3>

          <div className={styles.inputs}>
            <label>Nome</label>
            <TextField fullWidth variant="filled" label="Nome" name="Nome" />

            <label>Senha</label>
            <TextField fullWidth variant="filled" label="Senha" name="senha" type="password" />
          </div>

          <div className={styles['extra-options']}>
            <a href="#">Recuperar senha</a>
          </div>

          <div className={styles.buttons}>
            <button className={styles.login}>Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
