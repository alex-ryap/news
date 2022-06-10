import { Divider, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAllPosts } from '../store/posts/getAllPosts';
import { clearStatus } from '../store/posts/postsSlice';
import { PostItem } from './PostItem';
import { Filter } from './Filter';
import { PostsContainer } from './PostsContainer';

export const TabAllPosts: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();
  const { postsList, isLoading, status } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  return (
    <PostsContainer isLoading={isLoading}>
      <Filter />
      <Divider />
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
