import { Button, Grid, Pagination, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useSnackbar } from '../hooks/useSnackbar';
import { clearStatus } from '../store/posts/postsSlice';
import { PostsContainer } from '../components/PostsContainer';
import { PostItem } from '../components/PostItem';
import { useNavigate } from 'react-router';
import { POSTS_PER_PAGE, POST_CREATE, WRITERS_ONLY } from '../utils/constants';
import { Filter } from '../components/Filter';
import { getPosts } from '../store/posts/getPosts';
import { IFilterParams, ISearchParams } from '../utils/interfaces';
import { useSearchParams } from 'react-router-dom';
import { getPostsTags } from '../store/posts/getPostsTags';

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const tags = searchParams.get('tags') || '';
  const author = searchParams.get('author') || '';
  const header = searchParams.get('header') || '';

  const { user } = useAppSelector((state) => state.user);
  const { tags: tagsList } = useAppSelector((state) => state.posts);
  const { postsList, totalPosts, isLoading, status } = useAppSelector(
    (state) => state.posts
  );
  const [pagesCount, setPagesCount] = useState<number>(1);

  useEffect(() => {
    dispatch(getPostsTags());
  }, []);

  useEffect(() => {
    const queryParams: ISearchParams = {};
    const filterParams: IFilterParams = {};

    if (tags) {
      filterParams.tags = tags;
      queryParams.tags = tags;
    }
    if (header) {
      filterParams.header = header;
      queryParams.header = header;
    }
    if (author) {
      filterParams.author = parseInt(author);
      queryParams.author = author;
    }

    dispatch(
      getPosts({
        ...filterParams,
        offset: (currentPage - 1) * POSTS_PER_PAGE,
        limit: POSTS_PER_PAGE,
      })
    );
    setSearchParams({ page: currentPage.toString(), ...queryParams });
  }, [currentPage, author, tags, header, dispatch, setSearchParams]);

  useEffect(() => {
    setPagesCount(Math.ceil(totalPosts / POSTS_PER_PAGE));
  }, [totalPosts]);

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const queryParams: ISearchParams = {};

    if (tags.length) {
      queryParams.tags = tags;
    }
    if (header) {
      queryParams.header = header;
    }
    if (author) {
      queryParams.author = author;
    }
    setSearchParams({ page: value.toString(), ...queryParams });
  };

  return (
    <PostsContainer
      isLoading={isLoading}
      left={
        <Filter
          tags={tagsList}
          queryTags={tags}
          queryAuthor={author}
          queryHeader={header}
          setSearchParams={setSearchParams}
          // onFilter={handleSetFilter}
        />
      }
      right={
        WRITERS_ONLY.includes(user.role) && (
          <Button variant="outlined" onClick={() => navigate(POST_CREATE)}>
            Create post
          </Button>
        )
      }
    >
      <Grid item>
        <Typography variant="h3">Recent news</Typography>
      </Grid>
      {postsList.length ? (
        <>
          {postsList.map((post, idx) => (
            <PostItem key={post.id || idx} post={post} id={post.id || idx} />
          ))}
          <Grid item alignSelf="flex-end">
            <Pagination
              count={pagesCount}
              page={currentPage}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Grid>
        </>
      ) : (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          mt={5}
        >
          No news
        </Typography>
      )}
    </PostsContainer>
  );
};
