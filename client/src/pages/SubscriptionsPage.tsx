import { Button, Grid, Pagination, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter } from '../components/Filter';
import { ModalSubscribes } from '../components/ModalSubscribes';
import { PostItem } from '../components/PostItem';
import { PostsContainer } from '../components/PostsContainer';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPosts } from '../store/posts/getPosts';
import { clearStatus } from '../store/posts/postsSlice';
import { POSTS_PER_PAGE } from '../utils/constants';
import { IFilterParams, ISearchParams } from '../utils/interfaces';

export const SubscriptionsPage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const tags = searchParams.get('tags') || '';
  const author = searchParams.get('author') || '';
  const header = searchParams.get('header') || '';

  const { user } = useAppSelector((state) => state.user);
  const { postsList, totalPosts, isLoading, status } = useAppSelector(
    (state) => state.posts
  );
  const [isOpenSubscribesModal, setIsOpenSubscribesModal] =
    useState<boolean>(false);
  const [pagesCount, setPagesCount] = useState<number>(1);

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
    setSearchParams({ page: currentPage.toString(), ...queryParams });

    if (user.tags.length) {
      dispatch(
        getPosts({
          ...filterParams,
          offset: (currentPage - 1) * POSTS_PER_PAGE,
          limit: POSTS_PER_PAGE,
        })
      );
    }
  }, [user.tags, currentPage, author, header, tags, dispatch, setSearchParams]);

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
        user.tags.length > 0 && (
          <Filter
            tags={user.tags}
            queryTags={tags}
            queryAuthor={author}
            queryHeader={header}
            setSearchParams={setSearchParams}
          />
        )
      }
      right={
        user.tags.length > 0 && (
          <Button
            variant="outlined"
            onClick={() => setIsOpenSubscribesModal(true)}
          >
            add subscribes
          </Button>
        )
      }
    >
      {user.tags.length ? (
        <>
          <Grid item>
            <Typography variant="h3">Subscriptions</Typography>
          </Grid>
          {postsList.length ? (
            <>
              {postsList.map((post, idx) => (
                <PostItem
                  key={post.id || idx}
                  post={post}
                  id={post.id || idx}
                />
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
            <Grid item alignSelf="center">
              <Typography variant="h6" color="text.secondary">
                No news
              </Typography>
            </Grid>
          )}
        </>
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
            You don't have subscriptions
          </Typography>
          <Typography variant="h6" mt={1}>
            Do you want to subscribe?
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setIsOpenSubscribesModal(true)}
          >
            Subscribe
          </Button>
        </Grid>
      )}
      <ModalSubscribes
        isOpen={isOpenSubscribesModal}
        onClose={() => setIsOpenSubscribesModal(false)}
      />
    </PostsContainer>
  );
};
