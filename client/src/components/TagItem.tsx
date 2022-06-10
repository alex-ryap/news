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

interface TagItemProps {
  tag: string;
  onDelete: () => void;
}

export const TagItem: FC<TagItemProps> = ({ tag, onDelete }) => {
  return (
    <Grid item xs={12} md={4} flexGrow={1}>
      <Card>
        <CardContent>
          <Typography variant="h6">{tag}</Typography>
        </CardContent>
        <CardActions>
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
