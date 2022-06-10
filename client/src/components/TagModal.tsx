import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { FC, useCallback, useState } from 'react';

interface ITagModalProps {
  tag: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (tag: string) => void;
}

export const TagModal: FC<ITagModalProps> = ({
  tag,
  isOpen,
  onClose,
  onSave,
}) => {
  const [changedTag, setChangedTag] = useState<string>(tag);

  const handleSave = useCallback(() => {
    onSave(changedTag);
  }, [changedTag, onSave]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Change tag</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>Here you can change tag</DialogContentText>
        <TextField
          fullWidth
          variant="outlined"
          value={changedTag}
          onChange={(e) => setChangedTag(e.target.value)}
        />
        <DialogActions sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
