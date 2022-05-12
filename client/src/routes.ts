import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { HOME_PAGE, LOGIN_PAGE, LOGOUT } from './utils/constants';
import { IRoute } from './utils/interfaces';

export const publicRoutes: IRoute[] = [
  {
    path: LOGIN_PAGE,
    component: LoginPage,
  },
];

export const privateRoutes: IRoute[] = [
  {
    path: HOME_PAGE,
    component: HomePage,
  },
  {
    path: LOGOUT,
    component: LoginPage,
  },
];
