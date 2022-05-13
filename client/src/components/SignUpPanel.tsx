import { Box, Button, TextField, Typography } from '@mui/material';
import { FC, FormEvent, useCallback } from 'react';
import { TabPanel } from './TabPanel';

interface SignUpProps {
  tab: number;
  login: string;
  password: string;
  confirmPassword: string;
  changeLogin: Function;
  changePassword: Function;
  changeConfirmPassword: Function;
  handleRegister: Function;
}

export const SignUpPanel: FC<SignUpProps> = ({
  tab,
  login,
  password,
  confirmPassword,
  changeLogin,
  changePassword,
  changeConfirmPassword,
  handleRegister,
}) => {
  const signUp = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleRegister();
    },
    [handleRegister]
  );

  return (
    <TabPanel value={tab} index={1}>
      <Box component="form" onSubmit={signUp} sx={{ width: '500px', mt: 1 }}>
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
        <TextField
          error={password !== confirmPassword}
          helperText={
            password !== confirmPassword ? 'Passwords must be matches' : ''
          }
          margin="normal"
          required
          fullWidth
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => changeConfirmPassword(e.target.value)}
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
  );
};
