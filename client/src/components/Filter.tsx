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
  TextField,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthors } from '../store/user/getAuthors';
import { getPosts } from '../store/posts/getPosts';
import { getPostsTags } from '../store/posts/getPostsTags';
import { IFilterParams, ISearchParams } from '../utils/interfaces';
import { URLSearchParamsInit } from 'react-router-dom';

interface IFilterProps {
  tags: string[];
  queryTags: string;
  queryAuthor: string;
  queryHeader: string;
  setSearchParams: (params: URLSearchParamsInit) => void;
}

export const Filter: FC<IFilterProps> = ({
  tags,
  queryTags,
  queryAuthor,
  queryHeader,
  setSearchParams,
}) => {
  const dispatch = useAppDispatch();
  const { authors } = useAppSelector((state) => state.user);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    queryTags ? queryTags.split(',') : []
  );
  const [header, setHeader] = useState<string>(queryHeader);
  // const [isRead, setIsRead] = useState<boolean>(false);
  const [author, setAuthor] = useState<string>(queryAuthor);
  const [expanded, setExpanded] = useState<boolean>(true);

  useEffect(() => {
    if (!authors.length) {
      dispatch(getAuthors());
    }
  }, [dispatch, authors]);

  const handleAddTag = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
  };

  const handleDeleteTag = (tag: string) => {
    setSelectedTags([...selectedTags.filter((tagItem) => tagItem !== tag)]);
  };

  const handleSelectAuthor = (event: SelectChangeEvent) => {
    setAuthor(event.target.value.toString());
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
    setAuthor('');
    // setIsRead(false);
    setHeader('');
    setSearchParams({ page: '1' });
  };

  const handleAcceptFilters = () => {
    const queryParams: ISearchParams = {};

    if (selectedTags.length) {
      queryParams.tags = selectedTags.join(',');
    }
    if (header) {
      queryParams.header = header;
    }
    if (author) {
      queryParams.author = author;
    }

    setSearchParams({ page: '1', ...queryParams });
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
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </Grid>
            {/* <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRead}
                    onChange={() => setIsRead(!isRead)}
                  />
                }
                label="Readed posts"
              />
            </Grid> */}
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
