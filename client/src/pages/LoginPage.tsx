import { Alert, Box, Snackbar, Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignInPanel } from '../components/SignInPanel';
import { SignUpPanel } from '../components/SignUpPanel';
import { useAuth } from '../hooks/useAuth';
import { ERROR_TIMEOUT } from '../utils/constants';

export const LoginPage: FC = () => {
  const [tab, setTab] = useState(0);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.error) {
      setErrMsg(auth.error);
      setTimeout(() => setErrMsg(''), ERROR_TIMEOUT);
    } else if (auth.token) {
      navigate('/');
    }
  }, [auth, navigate]);

  const handleLogin = useCallback(() => {
    auth.signin(login, password);
    setLogin('');
    setPassword('');
    setConfirmPassword('');
  }, [login, password, auth]);

  const handleRegister = useCallback(() => {
    auth.registration(login, password);
    setConfirmPassword('');
    setTab(0);
  }, [login, password, auth]);

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

      {errMsg && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={!!errMsg}
          autoHideDuration={ERROR_TIMEOUT}
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
