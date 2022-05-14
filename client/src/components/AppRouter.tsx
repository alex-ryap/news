import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { privateRoutes, publicRoutes } from '../routes';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter: FC = () => {
  const auth = useAuth();

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <PrivateRoute>
              <route.component />
            </PrivateRoute>
          }
        />
      ))}
      <Route path="*" element={auth.token ? <HomePage /> : <LoginPage />} />
    </Routes>
  );
};
