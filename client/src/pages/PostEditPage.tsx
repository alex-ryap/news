import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { IPost } from '../utils/interfaces';
import { updatePost } from '../store/posts/updatePost';
import { createPost } from '../store/posts/createPost';
import { deletePost } from '../store/posts/deletePost';
import { deletePost as deletePostFromAdmin } from '../store/admin/deletePost';
import { updatePost as updatePostFromAdmin } from '../store/admin/updatePost';
import { useSnackbar } from '../hooks/useSnackbar';
import { clearStatus } from '../store/posts/postsSlice';
import { HOME_PAGE } from '../utils/constants';
import { PostState, UserRole } from '../utils/enums';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface ILocationState {
  post: IPost;
}

export const PostEditPage: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { post } = (location.state as ILocationState) || {};
  const { tags, status } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.user);
  const [header, setHeader] = useState<string>(post?.header || '');
  const [description, setDescription] = useState<string>(
    post?.description || ''
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);
  const [isPublicate, setIsPublicate] = useState<boolean>(
    post?.state === PostState.PUBLISHED ? true : false
  );
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
      navigate(HOME_PAGE);
    }
  }, [status, snackbar, navigate]);

  const handleChangeTags = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSaveNews = () => {
    const newPost = {
      header,
      description,
      tags: selectedTags,
      state: isPublicate ? 'published' : 'draft',
      publicationDate: Date.now(),
    };
    if (post?.id) {
      if (user.role === UserRole.WRITER) {
        dispatch(updatePost({ id: post.id, ...newPost }));
      } else if (user.role === UserRole.ADMIN) {
        dispatch(updatePostFromAdmin({ id: post.id, ...newPost }));
      }
    } else {
      dispatch(createPost(newPost));
    }
  };

  const handleDeletePost = () => {
    if (post?.id) {
      if (user.role === UserRole.WRITER) {
        dispatch(deletePost(post.id));
      } else if (user.role === UserRole.ADMIN) {
        dispatch(deletePostFromAdmin(post.id));
      }
    }
  };

  return (
    <Box sx={{ margin: '0 auto', maxWidth: '800px' }}>
      <Grid container direction="column" rowSpacing={2}>
        <Grid item>
          <Button
            startIcon={<ArrowBackIosNewIcon />}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Grid>
        <Grid item alignSelf="flex-end">
          <Typography variant="h3">
            {post?.header ? 'Edit post' : 'Create new post'}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Header"
            variant="outlined"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Text post"
            variant="outlined"
            multiline
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="tags">Tags</InputLabel>
            <Select
              labelId="tags"
              id="tags-select"
              multiple
              value={selectedTags}
              onChange={handleChangeTags}
              input={<OutlinedInput label="Tags" />}
            >
              {tags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {post?.state && (
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1">Publish</Typography>
            </Grid>
            <Grid item>
              <Switch
                checked={isPublicate}
                onChange={() => setIsPublicate(!isPublicate)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            </Grid>
          </Grid>
        )}
        <Grid item mt={2}>
          <Divider />
        </Grid>
        <Grid item container columnSpacing={1} justifyContent="flex-end">
          {post?.header &&
            (post?.state !== PostState.PUBLISHED ||
              user.role === UserRole.ADMIN) && (
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<DeleteForeverIcon />}
                  onClick={handleDeletePost}
                >
                  Delete
                </Button>
              </Grid>
            )}
          <Grid item>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveNews}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
