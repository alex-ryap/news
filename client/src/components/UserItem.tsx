import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IUser } from '../utils/interfaces';

interface UserItemProps {
  user: IUser;
  onDelete: () => void;
  onEdit: () => void;
}

export const UserItem: FC<UserItemProps> = ({ user, onDelete, onEdit }) => {
  return (
    <Grid item xs={12} md={4} flexGrow={1}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="h6">{user.firstName}</Typography>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 14 }}
                gutterBottom
              >
                {user.lastName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                color="text.secondary"
                sx={{ fontSize: 16 }}
                gutterBottom
              >
                {user.role}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="outlined" startIcon={<EditIcon />} onClick={onEdit}>
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
