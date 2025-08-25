import { useEffect, useState, useContext, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { isAdminContext } from '../../context/is-admin-context';

type PrivateRouteProps = {
  children: JSX.Element;
  requiredRole?: string | string[];
};

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAdmin, setName, setIsAdmin } = useContext(isAdminContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch(`${apiUrl}/user-info`, {
          credentials: 'include',
        });

        if (res.ok) {
          const userData = await res.json();
          setName(userData.userInfo.name);
          setIsAdmin(userData.userInfo.tipo);
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

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(isAdmin)) {
      return <Navigate to="/dashboard" />; // redireciona se não tem permissão
    }
  }

  return children;
}
