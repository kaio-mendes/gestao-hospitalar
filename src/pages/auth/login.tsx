import { TextField } from '@mui/material';
import styles from '../../assets/styles/pages/auth/login.module.css';
import loginImage from '../../assets/images/doctor-login.svg';
import logo from '../../assets/images/logo.jpg';
import { UserFetchLogin } from './fetch-login';
import type React from 'react';

export const Login = () => {
  const { setPassword, setEmail, handleLogin } = UserFetchLogin();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleLogin();
  }

  return (
    <div className={styles.container}>
      <div className={styles.images}>
        <img src={loginImage} />
      </div>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <div className={styles.align}>
            <div className={styles.logo}>
              <img src={logo} />
            </div>
            <h2>SGHSS - Gerência Hospitalar</h2>
          </div>

          <h3>Entre</h3>

          <div className={styles.inputs}>
            <label>Nome</label>
            <TextField fullWidth variant="filled" label="Nome" name="Nome" onChange={e => setEmail(e.target.value)} />

            <label>Senha</label>
            <TextField
              fullWidth
              variant="filled"
              label="Senha"
              name="senha"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className={styles['extra-options']}>
            <a href="#">Recuperar senha</a>
          </div>

          <div className={styles.buttons}>
            <button className={styles.login} type="submit">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
