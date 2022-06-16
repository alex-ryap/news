import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserPost } from '../store/admin/adminSlice';
import { PostState } from '../utils/enums';
import { IPost } from '../utils/interfaces';

interface IPostItemProps {
  id: number;
  isEditable?: boolean;
  post: IPost | IUserPost;
}

export const PostItem: FC<IPostItemProps> = ({
  id,
  isEditable = false,
  post,
}) => {
  const navigate = useNavigate();

  const handleOpenPost = () => {
    navigate(`/posts/${id}`, {
      state: {
        post,
      },
    });
  };

  const handleEditPost = () => {
    navigate(`/posts/${id}/edit`, {
      state: {
        post,
      },
    });
  };

  return (
    <Grid item>
      <Card>
        <CardContent>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              {post.tags && (
                <Stack direction="row" spacing={1}>
                  {post.tags.map((tag, idx) => (
                    <Typography
                      key={idx}
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      #{tag}
                    </Typography>
                  ))}
                </Stack>
              )}
            </Grid>
            {post?.state && (
              <Grid item>
                <Typography
                  variant="body1"
                  padding="4px 8px"
                  border={`1px solid ${
                    post.state === PostState.PUBLISHED ? '#4caf50' : '#f44336'
                  }`}
                  borderRadius={1}
                  color={
                    post.state === PostState.PUBLISHED ? '#4caf50' : '#f44336'
                  }
                >
                  {post.state}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Typography variant="h5">{post.header}</Typography>
          <Typography variant="subtitle1">{post.description}</Typography>
          {(post as IPost)?.authorFirstName &&
            (post as IPost)?.authorLastName && (
              <Typography mt={2} variant="subtitle2">{`${
                (post as IPost)?.authorFirstName
              } ${(post as IPost)?.authorLastName}`}</Typography>
            )}
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {isEditable && (
            <Button variant="text" onClick={handleEditPost}>
              Edit post
            </Button>
          )}
          <Button variant="text" onClick={handleOpenPost}>
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
