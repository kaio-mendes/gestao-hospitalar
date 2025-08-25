import { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminContext } from '../../context/is-admin-context';

export function UserFetchLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAdmin, setName } = useContext(isAdminContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogin = useCallback(async () => {
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if (res.ok) {
        const userInformation = await fetch(`${apiUrl}/user-info`, {
          credentials: 'include',
        });
        const userInformationData = await userInformation.json();

        setIsAdmin(userInformationData.userInfo.admin);
        setName(userInformationData.userInfo.name);

        navigate('/dashboard');
      } else {
        alert('Erro no login');
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password, navigate]);
  return { setEmail, email, setPassword, password, handleLogin };
}
