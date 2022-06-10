import { Box, Button, TextField, Typography } from '@mui/material';
import { FC, FormEvent, useCallback } from 'react';
import { TabPanel } from './TabPanel';

interface SignInProps {
  tab: number;
  login: string;
  password: string;
  changeLogin: (login: string) => void;
  changePassword: (password: string) => void;
  handleLogin: () => void;
}

export const SignInPanel: FC<SignInProps> = ({
  tab,
  login,
  password,
  changeLogin,
  changePassword,
  handleLogin,
}) => {
  const signIn = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleLogin();
    },
    [handleLogin]
  );

  return (
    <TabPanel value={tab} index={0}>
      <Box component="form" onSubmit={signIn} sx={{ width: '500px', mt: 1 }}>
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
          onChange={(e) => changeLogin(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => changePassword(e.target.value)}
        />
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
  );
};
