import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { TagsList } from '../components/TagsList';
import { useSnackbar } from '../hooks/useSnackbar';
import { clearStatus } from '../store/admin/adminSlice';
import { updateTagsList } from '../store/admin/updateTagsList';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const TagsPage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();
  const { tags, isLoading } = useAppSelector((state) => state.posts);
  const { status } = useAppSelector((state) => state.admin);
  const [newTag, setNewTag] = useState<string>('');

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  const handleAddTag = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (newTag) {
        dispatch(updateTagsList([...tags, newTag]));
        setNewTag('');
      }
    },
    [newTag, tags, dispatch]
  );

  return (
    <Box sx={{ margin: '0 auto', maxWidth: 800 }}>
      <Typography variant="h4">Tags:</Typography>
      <form onSubmit={handleAddTag}>
        <Grid container spacing={1} mt={1} justifyContent="flex-end">
          <Grid item>
            <TextField
              size="small"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              variant="outlined"
              label="New tag"
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>

      {isLoading ? <CircularProgress /> : <TagsList tagsList={tags} />}
    </Box>
  );
};
