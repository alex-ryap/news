import { Box, CircularProgress, Grid } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Filter } from './Filter';

interface IPostsContainer {
  isLoading: boolean;
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
}

export const PostsContainer: FC<IPostsContainer> = ({
  isLoading,
  left,
  right,
  children,
}) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 200px',
        gap: 4,
        alignItems: 'flex-start',
      }}
    >
      <Box>{left}</Box>
      <Grid container rowSpacing={2} direction="column" flexGrow={1}>
        {isLoading ? (
          <Grid item alignSelf="center">
            <CircularProgress />
          </Grid>
        ) : (
          children
        )}
      </Grid>
      <Grid container justifyContent="center">
        {right}
      </Grid>
    </Box>
  );
};
