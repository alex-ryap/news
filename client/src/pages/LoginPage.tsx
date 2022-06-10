import { Box, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignInPanel } from '../components/SignInPanel';
import { SignUpPanel } from '../components/SignUpPanel';
import { useSnackbar } from '../hooks/useSnackbar';
import { clearStatus } from '../store/auth/authSlice';
import { signIn } from '../store/auth/SignIn';
import { signUp } from '../store/auth/SignUp';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { a11yProps } from '../utils/commons';
import { HOME_PAGE } from '../utils/constants';

interface ILocationState {
  from: string;
}

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthed, status } = useAppSelector((state) => state.auth);

  const [tab, setTab] = useState<number>(0);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthed) {
      const { from } = (location.state as ILocationState) || HOME_PAGE;
      navigate(from);
    }
  }, [isAuthed, navigate, location.state]);

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  const handleLogin = useCallback(() => {
    dispatch(
      signIn({
        login,
        password,
      })
    );
  }, [dispatch, login, password]);

  const handleRegister = useCallback(() => {
    dispatch(
      signUp({
        login,
        password,
      })
    );
    setConfirmPassword('');
    setTab(0);
  }, [dispatch, login, password]);

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black',
      }}
    >
      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab label="Sign In" {...a11yProps(0)} />
        <Tab label="Sign Up" {...a11yProps(1)} />
      </Tabs>

      <SignInPanel
        tab={tab}
        login={login}
        password={password}
        changeLogin={setLogin}
        changePassword={setPassword}
        handleLogin={handleLogin}
      />
      <SignUpPanel
        tab={tab}
        login={login}
        password={password}
        confirmPassword={confirmPassword}
        changeLogin={setLogin}
        changePassword={setPassword}
        changeConfirmPassword={setConfirmPassword}
        handleRegister={handleRegister}
      />
    </Box>
  );
};
