import { Button, Grid, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPosts } from '../store/posts/getPosts';
import { clearStatus } from '../store/posts/postsSlice';
import { ModalSubscribes } from './ModalSubscribes';
import { PostItem } from './PostItem';
import { PostsContainer } from './PostsContainer';

interface TabSubscriptionsProps {
  selectedTag?: string;
}

export const TabSubscriptions: FC<TabSubscriptionsProps> = ({
  selectedTag,
}) => {
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
    <PostsContainer isLoading={isLoading}>
      {user.tags.length ? (
        <>
          <Grid item alignSelf="flex-end">
            <Button
              variant="outlined"
              onClick={() => setIsOpenSubscribesModal(true)}
            >
              add subscribes
            </Button>
          </Grid>

          {postsList.length ? (
            (selectedTag
              ? postsList.filter((post) => post.tags.includes(selectedTag))
              : postsList
            ).map((post, idx) => (
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
        <Grid item container direction="column" alignItems="center">
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
