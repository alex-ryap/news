import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import { FC, useCallback, useState } from 'react';
import { USER_ROLES } from '../utils/constants';

interface ModalUserRoleProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (userRole: string) => void;
}

export const ModalUserRole: FC<ModalUserRoleProps> = ({
  role,
  isOpen,
  onClose,
  onSave,
}) => {
  const [userRole, setUserRole] = useState<string>(role);

  const handleSave = useCallback(() => {
    onSave(userRole);
  }, [userRole, onSave]);

  const handleChangeUserRole = useCallback((event: SelectChangeEvent) => {
    setUserRole(event.target.value);
  }, []);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>Change role</DialogTitle>
      <DialogContent>
        <DialogContentText mb={2}>
          Here you can change user role
        </DialogContentText>
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="user-role">Role</InputLabel>
            <Select
              labelId="user-role"
              id="user-role-select"
              value={userRole}
              label="Role"
              onChange={handleChangeUserRole}
            >
              {Object.entries(USER_ROLES).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
