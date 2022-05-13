import { Alert, Box, Snackbar, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInPanel } from '../components/SignInPanel';
import { SignUpPanel } from '../components/SignUpPanel';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../store/services/authApi';
import {
  isErrorWithMessage,
  isFetchBaseQueryError,
} from '../store/services/helpers';

export const LoginPage: FC = () => {
  const [tab, setTab] = useState(0);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const [registerUser, registerData] = useRegisterUserMutation();
  const [loginUser, loginData] = useLoginUserMutation();

  useEffect(() => {
    if (loginData && loginData.data?.token) {
      localStorage.setItem('token', JSON.stringify(loginData?.data?.token));
      navigate('/');
    }
  }, [loginData, registerData, navigate]);

  const handleLogin = useCallback(async () => {
    try {
      await loginUser({ login, password }).unwrap();
      setLogin('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        setErrMsg('error' in err ? err.error : JSON.stringify(err.data));
      } else if (isErrorWithMessage(err)) {
        setErrMsg(err.message);
      }
    }
  }, [login, password, loginUser]);

  const handleRegister = useCallback(async () => {
    try {
      await registerUser({ login, password });
      setLogin('');
      setPassword('');
      setConfirmPassword('');
      setTab(0);
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        setErrMsg('error' in err ? err.error : JSON.stringify(err.data));
      } else if (isErrorWithMessage(err)) {
        setErrMsg(err.message);
      }
    }
  }, [login, password, registerUser]);

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleClose = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }

      setErrMsg('');
    },
    []
  );

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

      {(loginData.isError || registerData.isError) && errMsg && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!errMsg}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" variant="filled">
            {errMsg}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};
