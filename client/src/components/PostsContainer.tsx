import { CircularProgress, Grid } from '@mui/material';
import { FC, ReactNode } from 'react';

interface IPostsContainer {
  isLoading: boolean;
  children: ReactNode;
}

export const PostsContainer: FC<IPostsContainer> = ({
  isLoading,
  children,
}) => {
  return (
    <Grid container rowSpacing={2} direction="column">
      {isLoading ? (
        <Grid item alignSelf="center">
          <CircularProgress />
        </Grid>
      ) : (
        children
      )}
    </Grid>
  );
};
