import { useEffect, useState, useContext, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminContext } from '../../context/is-admin-context';

type PrivateRouteProps = {
  children: JSX.Element;
  requiredRole?: string;
};

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAdmin, setName, setIsAdmin } = useContext(isAdminContext);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/user-info', {
          credentials: 'include',
        });

        if (res.ok) {
          const userData = await res.json();
          setName(userData.userInfo.name);
          setIsAdmin(userData.userInfo.tipo === 'admin');
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
