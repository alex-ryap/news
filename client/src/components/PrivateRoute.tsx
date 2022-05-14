import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LOGIN_PAGE } from '../utils/constants';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: ReactElement;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.token) {
    return <Navigate to={LOGIN_PAGE} state={{ from: location }} replace />;
  }

  return children;
};
