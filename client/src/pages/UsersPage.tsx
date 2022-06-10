import { Box, CircularProgress, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { UsersList } from '../components/UsersList';
import { getUsers } from '../store/admin/getUsers';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const UsersPage: FC = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  return (
    <Box sx={{ margin: '0 auto', maxWidth: 800 }}>
      <Typography variant="h4">Users:</Typography>
      {isLoading ? <CircularProgress /> : <UsersList usersList={users} />}
    </Box>
  );
};
