import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { ModalSubscribes } from '../components/ModalSubscribes';
import { PostItem } from '../components/PostItem';
import { PostsContainer } from '../components/PostsContainer';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPosts } from '../store/posts/getPosts';
import { clearStatus } from '../store/user/userSlice';

export const SubscriptionsPage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();
  const { user, status } = useAppSelector((state) => state.user);
  const { postsList, isLoading } = useAppSelector((state) => state.posts);
  const [isOpenSubscribesModal, setIsOpenSubscribesModal] =
    useState<boolean>(false);

  useEffect(() => {
    if (user.tags.length) {
      const params = {
        tags: user.tags.join(', '),
      };
      dispatch(getPosts(params));
    }
  }, [user.tags, dispatch]);

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
        user.tags.length > 0 && (
          <Button
            variant="outlined"
            onClick={() => setIsOpenSubscribesModal(true)}
          >
            add subscribes
          </Button>
        )
      }
    >
      {user.tags.length ? (
        <>
          <Grid item>
            <Typography variant="h3">Subscriptions</Typography>
          </Grid>
          {postsList.length ? (
            postsList.map((post, idx) => (
              <PostItem key={post.id || idx} post={post} id={post.id || idx} />
            ))
          ) : (
            <Grid item alignSelf="center">
              <Typography variant="h6" color="text.secondary">
                No news
              </Typography>
            </Grid>
          )}
        </>
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
            You don't have subscriptions
          </Typography>
          <Typography variant="h6" mt={1}>
            Do you want to subscribe?
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setIsOpenSubscribesModal(true)}
          >
            Subscribe
          </Button>
        </Grid>
      )}
      <ModalSubscribes
        isOpen={isOpenSubscribesModal}
        onClose={() => setIsOpenSubscribesModal(false)}
      />
    </PostsContainer>
  );
};
