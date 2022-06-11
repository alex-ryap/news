import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { PostItem } from '../components/PostItem';
import { PostsContainer } from '../components/PostsContainer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getMyPosts } from '../store/posts/getMyPosts';
import { POST_CREATE } from '../utils/constants';

export const MyPostsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { postsList, isLoading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <PostsContainer
      isLoading={isLoading}
      widgets={
        postsList.length > 0 && (
          <Button variant="outlined" onClick={() => navigate(POST_CREATE)}>
            Create post
          </Button>
        )
      }
    >
      <Grid item>
        <Typography variant="h3">My posts</Typography>
      </Grid>
      {postsList.length ? (
        postsList.map((post, idx) => (
          <PostItem
            key={post.id || idx}
            post={post}
            id={post.id || idx}
            isEditable
          />
        ))
      ) : (
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '70vh' }}
        >
          <Typography variant="h6" color="text.secondary">
            You don't have makes posts
          </Typography>
          <Typography variant="h6" mt={1}>
            Do you want to publish your first post?
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => navigate(POST_CREATE)}
          >
            Create post
          </Button>
        </Grid>
      )}
    </PostsContainer>
  );
};
