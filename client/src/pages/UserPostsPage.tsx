import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { PostItem } from '../components/PostItem';
import { PostsContainer } from '../components/PostsContainer';
import { useSnackbar } from '../hooks/useSnackbar';
import { IUserData } from '../store/admin/adminSlice';
import { getUserPosts } from '../store/admin/getUserPosts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearStatus } from '../store/posts/postsSlice';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface ILocationState {
  user: IUserData;
}

export const UserPostsPage: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { user } = (location.state as ILocationState) || '';
  const { userPosts, isLoading, status } = useAppSelector(
    (state) => state.admin
  );

  useEffect(() => {
    if (id) {
      dispatch(getUserPosts(parseInt(id)));
    }
  }, []);

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  return (
    <PostsContainer isLoading={isLoading}>
      <Grid item>
        <Button
          startIcon={<ArrowBackIosNewIcon />}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h3">Posts of {user?.firstName}</Typography>
      </Grid>
      {userPosts.length ? (
        userPosts.map((post, idx) => (
          <PostItem
            key={post.id || idx}
            post={post}
            id={post.id || idx}
            isEditable
          />
        ))
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mt={5}
        >
          No news
        </Typography>
      )}
    </PostsContainer>
  );
};
