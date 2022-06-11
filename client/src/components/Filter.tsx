import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthors } from '../store/user/getAuthors';
import { getPosts } from '../store/posts/getPosts';
import { getPostsTags } from '../store/posts/getPostsTags';

interface IFilterParams {
  tags?: string;
  header?: string;
  author?: number;
}

export const Filter: FC = () => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state.user);
  const { tags } = useAppSelector((state) => state.posts);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [containedText, setContainedText] = useState<string>('');
  const [isRead, setIsRead] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(true);

  useEffect(() => {
    if (!authors.length) {
      dispatch(getAuthors());
    }
    if (!tags.length) {
      dispatch(getPostsTags());
    }
  }, [dispatch, authors, tags]);

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
    const filter: IFilterParams = {};
    selectedTags.length && (filter.tags = selectedTags.join(', '));
    containedText && (filter.header = containedText);
    author && (filter.author = parseInt(author));

    dispatch(
      getPosts({
        ...filter,
      })
    );
  };

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="subtitle1">Filters</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          container
          rowSpacing={2}
          direction="column"
          alignItems="flex-start"
        >
          <Grid item container spacing={1} flexWrap="wrap">
            <Grid item>
              <Typography variant="subtitle1">Tags:</Typography>
            </Grid>
            {tags.map((tag, idx) =>
              selectedTags.includes(tag) ? (
                <Grid item key={idx}>
                  <Chip
                    label={tag}
                    color="primary"
                    onDelete={() => handleDeleteTag(tag)}
                  />
                </Grid>
              ) : (
                <Grid item key={idx}>
                  <Chip
                    label={tag}
                    onClick={() => handleAddTag(tag)}
                    variant="outlined"
                  />
                </Grid>
              )
            )}
          </Grid>
          <Grid item container direction="column" rowSpacing={2}>
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
                  <Checkbox
                    checked={isRead}
                    onChange={() => setIsRead(!isRead)}
                  />
                }
                label="Readed posts"
              />
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
      <AccordionActions>
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
      </AccordionActions>
    </Accordion>
  );
};
