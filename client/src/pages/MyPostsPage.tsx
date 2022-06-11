import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { PostItem } from '../components/PostItem';
import { PostsContainer } from '../components/PostsContainer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getMyPosts } from '../store/posts/getMyPosts';
import { POST_CREATE } from '../utils/constants';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import ArticleIcon from '@mui/icons-material/Article';
import { IPost } from '../utils/interfaces';
import { PostState } from '../utils/enums';

export const MyPostsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { postsList, isLoading } = useAppSelector((state) => state.posts);
  const [selectedFilter, setSelectedFilter] = useState<number>(0);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>(postsList);

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPosts(postsList);
  }, [postsList]);

  const handleFilterList = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    state: PostState
  ) => {
    setSelectedFilter(index);
    setFilteredPosts([...postsList.filter((post) => post.state === state)]);
  };

  const handleResetFiltersList = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedFilter(index);
    setFilteredPosts(postsList);
  };

  return (
    <PostsContainer
      isLoading={isLoading}
      left={
        <List component="nav" aria-label="main post states">
          <ListItemButton
            selected={selectedFilter === 0}
            onClick={(e) => handleResetFiltersList(e, 0)}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="All Posts" />
          </ListItemButton>
          <ListItemButton
            selected={selectedFilter === 1}
            onClick={(e) => handleFilterList(e, 1, PostState.PUBLISHED)}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Published" />
          </ListItemButton>
          <ListItemButton
            selected={selectedFilter === 2}
            onClick={(e) => handleFilterList(e, 2, PostState.DRAFT)}
          >
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </List>
      }
      right={
        filteredPosts.length > 0 && (
          <Button variant="outlined" onClick={() => navigate(POST_CREATE)}>
            Create post
          </Button>
        )
      }
    >
      <Grid item>
        <Typography variant="h3">My posts</Typography>
      </Grid>
      {filteredPosts.length ? (
        filteredPosts.map((post, idx) => (
          <PostItem
            key={post.id || idx}
            post={post}
            id={post.id || idx}
            isEditable
          />
        ))
      ) : (
        <Grid
          item
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: '70vh' }}
        >
          <Typography variant="h6" color="text.secondary">
            You don't have makes posts
          </Typography>
          <Typography variant="h6" mt={1}>
            Do you want to publish your first post?
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => navigate(POST_CREATE)}
          >
            Create post
          </Button>
        </Grid>
      )}
    </PostsContainer>
  );
};
