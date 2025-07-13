import { Button, TextField } from '@mui/material';
import styles from '../../assets/styles/pages/auth/login.module.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [alert, setAlert] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toogleAlert = () => {
    setAlert('senha');
    setTimeout(() => {
      setAlert('');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    if (name === 'user') {
      setUser(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  };

  const authUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user === 'kaio' && password === '1234') {
      navigate('/dashboard');
    } else {
      setAlert('incorreta');
      setTimeout(() => {
        setAlert('');
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      {alert && (
        <div className={styles.alert}>
          <h3>
            {alert === 'incorreta' && 'Usuário ou senha incorreta'}
            {alert === 'senha' && (
              <>
                Converse com o responsável pelo sistema
                <br />
                para redefinir a senha
              </>
            )}
          </h3>
        </div>
      )}
      <div className={styles.inputs}>
        <h1>Login.</h1>
        <form onSubmit={authUser}>
          <TextField
            label="Usuário"
            variant="standard"
            name="user"
            value={user}
            onChange={handleChange}
            required
            fullWidth
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: '#fff',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#fff',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#fff',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
          />
          <TextField
            label="Password"
            variant="standard"
            fullWidth
            required
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="* * * * * * * *"
            sx={{
              '& .MuiInput-underline:before': {
                borderBottomColor: '#fff',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottomColor: '#fff',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#fff',
              },
              '& .MuiInputBase-input': {
                color: '#fff',
              },
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#fff',
              },
            }}
          />
          <Button variant="contained" color="warning" type="submit">
            Login
          </Button>
          <p onClick={toogleAlert}>Esqueceu a senha</p>
        </form>
      </div>
    </div>
  );
};
