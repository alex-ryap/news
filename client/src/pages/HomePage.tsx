import { Box, Button, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useSnackbar } from '../hooks/useSnackbar';
import { clearStatus } from '../store/posts/postsSlice';
import { PostsContainer } from '../components/PostsContainer';
import { PostItem } from '../components/PostItem';
import { getAllPosts } from '../store/posts/getAllPosts';
import { useNavigate } from 'react-router';
import { CAN_WRITE_POSTS, POST_CREATE } from '../utils/constants';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { user } = useAppSelector((state) => state.user);
  const { postsList, isLoading, status } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  return (
    <PostsContainer
      isLoading={isLoading}
      filter
      widgets={
        CAN_WRITE_POSTS.includes(user.role) && (
          <Button variant="outlined" onClick={() => navigate(POST_CREATE)}>
            Create post
          </Button>
        )
      }
    >
      <Grid item>
        <Typography variant="h3">Recent news</Typography>
      </Grid>
      {postsList.length ? (
        postsList.map((post, idx) => (
          <PostItem key={post.id || idx} post={post} id={post.id || idx} />
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
