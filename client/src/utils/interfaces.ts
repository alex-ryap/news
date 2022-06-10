import { FC } from 'react';
import { PostState, StatusType } from './enums';

export interface IRoute {
  path: string;
  component: FC;
  access: string[];
}

export interface IError {
  message: string;
}

export interface IRequestStatus {
  type: StatusType;
  message: string;
}

export interface ISnack {
  type: StatusType;
  message: string;
}

export interface IAuthData {
  login: string;
  password: string;
}

export interface IAuthContext {
  login: string;
  token: string;
  status: IRequestStatus | null;
  signIn: (login: string, password: string) => void;
  signUp: (login: string, password: string) => void;
  signOut: () => void;
  updateStatus: () => void;
}

export interface IPost {
  id: number;
  header: string;
  description: string;
  tags: string[];
  state: PostState;
  publicationDate: string;
  authorNickname: string;
  authorFirstName: string;
  authorLastName: string;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  tags: string[];
  showFirstName: boolean;
  showLastName: boolean;
  showPhone: boolean;
  role: string;
}
