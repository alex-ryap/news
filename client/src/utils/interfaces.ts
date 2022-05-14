import { FC } from 'react';

export interface IRoute {
  path: string;
  component: FC;
}

export interface IToken {
  token: string;
}

export interface IAuthData {
  login: string;
  password: string;
}

export interface IAuthContext {
  token: string;
  error: string;
  signin: (login: string, password: string) => void;
  registration: (login: string, password: string) => void;
  signout: () => void;
}
