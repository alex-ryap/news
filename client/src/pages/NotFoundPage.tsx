import { Box, Divider, Grid, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { HOME_PAGE, LOGIN_PAGE } from '../utils/constants';

export const NotFoundPage: FC = () => {
  const { isAuthed } = useAppSelector((state) => state.auth);

  return (
    <Box
      component="div"
      height="100vh"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Grid
        container
        direction="column"
        alignItems="center"
        rowSpacing={2}
        sx={{ maxWidth: 500 }}
      >
        <Grid
          item
          container
          columnSpacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography variant="h2" fontWeight="bold">
              404
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">Page not found</Typography>
          </Grid>
        </Grid>
        <Divider flexItem variant="middle" />
        <Grid item>
          <Link to={isAuthed ? HOME_PAGE : LOGIN_PAGE}>
            {isAuthed ? 'Go to home' : 'Go to login'}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
