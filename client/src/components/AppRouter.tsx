import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { privateRoutes } from '../routes';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserData } from '../store/user/getUserData';
import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthed } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthed) {
      dispatch(getUserData());
    }
  }, [isAuthed, dispatch]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        {privateRoutes.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={
              <PrivateRoute access={route.access}>
                <route.component />
              </PrivateRoute>
            }
          />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
