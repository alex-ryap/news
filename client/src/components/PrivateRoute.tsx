import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { HOME_PAGE, LOGIN_PAGE } from '../utils/constants';

interface PrivateRouteProps {
  access: string[];
  children: ReactElement;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ access, children }) => {
  const { isAuthed } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const location = useLocation();
  debugger;
  if (!isAuthed) {
    return (
      <Navigate to={LOGIN_PAGE} state={{ from: location.pathname }} replace />
    );
  }

  return access.includes(user.role) ? (
    children
  ) : (
    <Navigate to={HOME_PAGE} replace />
  );
};
