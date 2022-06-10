import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { IPost } from '../utils/interfaces';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { readPosts } from '../store/posts/readPosts';

interface ILocationState {
  post: IPost;
}

export const PostPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = (location.state as ILocationState) || {};

  // useEffect(() => {
  //   dispatch(readPosts([post.id]));
  // }, [dispatch, post]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ margin: '0 auto', maxWidth: '600px' }}>
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            variant="outlined"
            onClick={handleGoBack}
          >
            Back
          </Button>
        </Grid>
        <Grid item alignSelf="flex-end">
          <Typography variant="h3">{post.header}</Typography>
        </Grid>
        <Grid item container columnSpacing={1} justifyContent="flex-end">
          {post.tags.map((tag, idx) => (
            <Grid item key={idx}>
              <Typography color="text.secondary" fontSize={18} gutterBottom>
                #{tag}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{post.description}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
