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
  TextField,
} from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { updateTagsList } from '../store/admin/updateTagsList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPostsTags } from '../store/posts/getPostsTags';
import { updateUserTags } from '../store/user/updateUserTags';

interface ModalAddTagProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalAddTag: FC<ModalAddTagProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.posts);
  const [tag, setTag] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (tags.includes(tag)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [tags, tag]);

  const handleSaveSubscriptions = () => {
    const newTagsList = [...tags, tag];
    dispatch(updateTagsList(newTagsList));
    setTag('');
    onClose();
  };

  const handleChangeTag = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value.toLowerCase());
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Add new tag</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 1 }}
          fullWidth
          label="Tag name"
          variant="outlined"
          value={tag}
          error={error}
          helperText={error ? 'This tag already exist' : 'Tags must be unique'}
          onChange={handleChangeTag}
        />
        <DialogActions sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={error}
            variant="contained"
            onClick={handleSaveSubscriptions}
          >
            Add tag
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
