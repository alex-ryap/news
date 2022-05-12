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
