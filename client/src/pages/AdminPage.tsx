import { CircularProgress, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useEffect } from 'react';
import { TagsList } from '../components/TagsList';
import { UsersList } from '../components/UsersList';
import { getUsers } from '../store/admin/getUsers';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const AdminPage: FC = () => {
  const dispatch = useAppDispatch();
  const { users, isLoading: usersIsLoading } = useAppSelector(
    (state) => state.admin
  );
  const { tags, isLoading: tagsIsLoading } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr minmax(400px, 400px)',
        gap: 2,
        alignItems: 'start',
      }}
    >
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5">Users:</Typography>
        {usersIsLoading ? (
          <CircularProgress />
        ) : (
          <UsersList usersList={users} />
        )}
      </Paper>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h5">Tags:</Typography>
        {tagsIsLoading ? <CircularProgress /> : <TagsList tagsList={tags} />}
      </Paper>
    </Box>
  );
};
