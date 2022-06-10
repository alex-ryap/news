import {
  Box,
  Button,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { updateUserData } from '../store/user/updateUserData';
import { clearStatus } from '../store/user/userSlice';

export const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, status } = useAppSelector((state) => state.user);
  const [firstName, setFirstName] = useState<string>(user.firstName || '');
  const [lastName, setLastName] = useState<string>(user.lastName || '');
  const [phone, setPhone] = useState<string>(user.phone || '');
  const [showFirstName, setShowFirstName] = useState<boolean>(
    user.showFirstName
  );
  const [showLastName, setShowLastName] = useState<boolean>(user.showLastName);
  const [showPhone, setShowPhone] = useState<boolean>(user.showPhone);

  const snackbar = useSnackbar();

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (firstName || lastName || phone) {
      dispatch(
        updateUserData({
          firstName,
          lastName,
          phone,
          showFirstName,
          showLastName,
          showPhone,
        })
      );
    }
  };

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  return (
    <Box sx={{ margin: '0 auto', maxWidth: '600px' }}>
      <Typography variant="h4">Profile</Typography>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '15px',
              mt: 2,
            }}
            onSubmit={handleSave}
          >
            <TextField
              label="First name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              label="Phone number"
              value={phone}
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Typography
              variant="subtitle1"
              color="text.secondary"
              fontSize={16}
              fontWeight={700}
            >
              Role: {user.role}
            </Typography>
            <Grid container>
              <Grid
                item
                container
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Grid item>
                  <Typography variant="subtitle1">Show first name</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={showFirstName}
                    onChange={() => setShowFirstName(!showFirstName)}
                    inputProps={{ 'aria-label': 'show first name' }}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Grid item>
                  <Typography variant="subtitle1">Show last name</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={showLastName}
                    onChange={() => setShowLastName(!showLastName)}
                    inputProps={{ 'aria-label': 'show last name' }}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                sx={{ alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Grid item>
                  <Typography variant="subtitle1">Show phone</Typography>
                </Grid>
                <Grid item>
                  <Switch
                    checked={showPhone}
                    onChange={() => setShowPhone(!showPhone)}
                    inputProps={{ 'aria-label': 'show phone' }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider />
            <Button
              type="submit"
              sx={{ alignSelf: 'flex-end', minWidth: 150 }}
              variant="contained"
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};
