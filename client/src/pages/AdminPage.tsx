import {
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { FC, useEffect, useState } from 'react';
import { TagsList } from '../components/TagsList';
import { UsersList } from '../components/UsersList';
import { getUsers } from '../store/admin/getUsers';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ModalAddTag } from '../components/ModalAddTag';
import { useSnackbar } from '../hooks/useSnackbar';
import { clearStatus } from '../store/posts/postsSlice';
import { clearStatus as clearStatusAdmin } from '../store/admin/adminSlice';
import { getPosts } from '../store/posts/getPosts';
import { getPostsTags } from '../store/posts/getPostsTags';

export const AdminPage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();

  const {
    users,
    isLoading: usersIsLoading,
    status: userStatus,
  } = useAppSelector((state) => state.admin);
  const {
    tags,
    isLoading: tagsIsLoading,
    status: tagsStatus,
  } = useAppSelector((state) => state.posts);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPostsTags());
  }, [dispatch]);

  useEffect(() => {
    if (tagsStatus) {
      snackbar.showMessage(tagsStatus.type, tagsStatus.message, clearStatus);
    }
    if (userStatus) {
      snackbar.showMessage(
        userStatus.type,
        userStatus.message,
        clearStatusAdmin
      );
    }
  }, [tagsStatus, userStatus, snackbar]);

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
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Tags:</Typography>
          </Grid>
          <Grid item>
            <IconButton onClick={() => setIsOpen(true)}>
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
        {tagsIsLoading ? <CircularProgress /> : <TagsList tagsList={tags} />}
      </Paper>
      <ModalAddTag isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  );
};
