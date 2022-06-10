import { Typography } from '@mui/material';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getMyPosts } from '../store/posts/getMyPosts';
import { PostItem } from './PostItem';
import { PostsContainer } from './PostsContainer';

export const TabMyPosts: FC = () => {
  const dispatch = useAppDispatch();
  const { postsList, isLoading } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  return (
    <PostsContainer isLoading={isLoading}>
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
