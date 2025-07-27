import { jwtDecode } from 'jwt-decode';
import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminContext } from '../../context/is-admin-context';

export function UserFetchLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAdmin, setName } = useContext(isAdminContext);

  const handleLogin = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json(); //aqui recebe o token

      if (res.ok) {
        localStorage.setItem('token', data.token);
        const decoded: any = jwtDecode(data.token);
        const isAdmin = decoded.admin;
        const userName = decoded.name;
        setIsAdmin(isAdmin);
        setName(userName);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Erro no login');
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password, navigate]);
  return { setEmail, email, setPassword, password, handleLogin };
}
