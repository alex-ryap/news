import { FC, ReactNode, useState } from 'react';
import {
  useLoginUserMutation,
  useLogoutMutation,
  useRegisterUserMutation,
} from '../store/services/authApi';
import { isErrorWithMessage, isFetchBaseQueryError } from '../store/helpers';
import { TOKEN } from '../utils/constants';
import { createContext } from 'react';
import { IAuthContext } from '../utils/interfaces';

export const AuthContext = createContext<IAuthContext>(null!);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const localStorageToken = localStorage.getItem(TOKEN) || '';

  const [token, setToken] = useState<string>(localStorageToken);
  const [error, setError] = useState<string>('');

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [logoutUser] = useLogoutMutation();

  const signin = async (login: string, password: string) => {
    try {
      setError('');
      const data = await loginUser({ login, password }).unwrap();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem(TOKEN, JSON.stringify(data.token));
      }
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        setError('error' in err ? err.error : JSON.stringify(err.data));
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  };

  const registration = async (login: string, password: string) => {
    try {
      setError('');
      await registerUser({ login, password });
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        setError('error' in err ? err.error : JSON.stringify(err.data));
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  };

  const signout = async () => {
    try {
      setError('');
      await logoutUser(token);
      localStorage.removeItem('token');
      setToken('');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        setError('error' in err ? err.error : JSON.stringify(err.data));
      } else if (isErrorWithMessage(err)) {
        setError(err.message);
      }
    }
  };

  const value = { token, error, signin, registration, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
