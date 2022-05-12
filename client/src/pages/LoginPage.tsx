import { Box, Button, Tab, Tabs, TextField, Typography } from '@mui/material';
import {
  FC,
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { TabPanel } from '../components/TabPanel';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../store/services/authApi';

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
    if (loginData.isError) {
      setErrMsg('Invalid login or password');
    }
  }, [loginData, registerData, navigate]);

  const handleRegister = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log({
        login,
        password,
      });
      registerUser({ login, password });
      setLogin('');
      setPassword('');
      setConfirmPassword('');
      setTab(0);
    },
    [login, password, registerUser]
  );

  const handleLogin = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log({
        login,
        password,
      });
      loginUser({ login, password });
      setLogin('');
      setPassword('');
      setConfirmPassword('');
    },
    [login, password, loginUser]
  );

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
      <TabPanel value={tab} index={0}>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ width: '500px', mt: 1 }}
        >
          <Typography align="center" component="h1" variant="h4">
            Sign In
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Login"
            name="login"
            autoFocus
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginData.isError && (
            <Typography
              align="center"
              variant="h6"
              component="h5"
              color="tomato"
            >
              {errMsg}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ width: '500px', mt: 1 }}
        >
          <Typography align="center" component="h1" variant="h4">
            Sign Up
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Login"
            name="login"
            autoFocus
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            error={password !== confirmPassword}
            helperText={
              password !== confirmPassword && 'Passwords must be matches'
            }
            margin="normal"
            required
            fullWidth
            label="Confirm password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </TabPanel>
    </Box>
  );
};
