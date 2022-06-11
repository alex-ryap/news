import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPostsTags } from '../store/posts/getPostsTags';
import { updateUserTags } from '../store/user/updateUserTags';

interface ModalSubscribeProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalSubscribes: FC<ModalSubscribeProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { tags } = useAppSelector((state) => state.posts);
  const [selectedTags, setSelectedTags] = useState<string[]>(user.tags);

  useEffect(() => {
    if (!tags.length) {
      dispatch(getPostsTags());
    }
  }, [dispatch, tags]);

  const handleChangeTags = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setSelectedTags(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSaveSubscriptions = () => {
    dispatch(updateUserTags(selectedTags));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Add subscribes</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>Add new subscribes</DialogContentText>
        <Grid container direction="column" rowSpacing={2}>
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
        </Grid>
        <DialogActions sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSaveSubscriptions}>
            Subscribe
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
