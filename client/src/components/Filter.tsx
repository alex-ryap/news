import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthors } from '../store/user/getAuthors';
import { getPosts } from '../store/posts/getPosts';

export const Filter: FC = () => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state.user);
  const { tags } = useAppSelector((state) => state.posts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [containedText, setContainedText] = useState<string>('');
  const [isRead, setIsRead] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>('');

  useEffect(() => {
    dispatch(getAuthors());
  }, [dispatch]);

  const handleAddTag = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags([...selectedTags.filter((tagItem) => tagItem !== tag)]);
  };

  const handleSelectAuthor = (event: SelectChangeEvent) => {
    setAuthor(event.target.value);
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setAuthor('');
    setIsRead(false);
    setContainedText('');
    dispatch(getPosts({}));
  };

  const handleAcceptFilters = () => {
    dispatch(
      getPosts({
        tags: selectedTags.join(', '),
        header: containedText,
        author,
      })
    );
  };

  return (
    <Grid mt={2} mb={2} container columnSpacing={1} alignItems="flex-start">
      <Grid
        maxWidth="50%"
        item
        container
        alignItems="center"
        flexWrap="wrap"
        columnSpacing={2}
      >
        <Grid item>
          <Typography variant="subtitle1">Tags:</Typography>
        </Grid>
        <Grid item>
          <Stack spacing={1} direction="row" alignItems="center">
            {tags.map((tag, idx) =>
              selectedTags.includes(tag) ? (
                <Chip
                  key={idx}
                  label={tag}
                  onDelete={() => handleDeleteTag(tag)}
                />
              ) : (
                <Chip
                  key={idx}
                  label={tag}
                  onClick={() => handleAddTag(tag)}
                  variant="outlined"
                />
              )
            )}
          </Stack>
        </Grid>
      </Grid>
      <Grid item container direction="column" maxWidth="50%" rowSpacing={1}>
        <Grid item>
          <FormControl fullWidth size="small">
            <InputLabel id="author">Author</InputLabel>
            <Select
              labelId="author"
              id="author-select"
              value={author}
              label="Author"
              onChange={handleSelectAuthor}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {authors.map((author, idx) => (
                <MenuItem key={idx} value={author.id}>
                  {`${author?.firstName} ${author?.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Contain text"
            variant="outlined"
            size="small"
            value={containedText}
            onChange={(e) => setContainedText(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox checked={isRead} onChange={() => setIsRead(!isRead)} />
            }
            label="Readed posts"
          />
        </Grid>
        <Grid item container justifyContent="flex-end" columnSpacing={1}>
          <Grid item>
            <Button variant="outlined" onClick={handleClearFilters}>
              Clear
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" onClick={handleAcceptFilters}>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
