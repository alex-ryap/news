import { Tab, Tabs } from '@mui/material';
import { FC, SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { TabAllPosts } from '../components/TabAllPosts';
import { TabPanel } from '../components/TabPanel';
import { a11yProps } from '../utils/commons';
import { TabMyPosts } from '../components/TabMyPosts';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearStatus } from '../store/user/userSlice';
import { useSnackbar } from '../hooks/useSnackbar';
import { getPostsTags } from '../store/posts/getPostsTags';
import { TabSubscriptions } from '../components/TabSubscriptions';

const canWritePosts = ['writer', 'admin'];

export const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbar();
  const { user, status } = useAppSelector((state) => state.user);
  const [tab, setTab] = useState<number>(0);

  useEffect(() => {
    dispatch(getPostsTags());
  }, [dispatch]);

  useEffect(() => {
    if (status) {
      snackbar.showMessage(status.type, status.message, clearStatus);
    }
  }, [status, snackbar]);

  const handleChangeTab = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setTab(newValue);
    },
    []
  );

  return (
    <>
      <Tabs value={tab} onChange={handleChangeTab}>
        <Tab
          label="All news"
          {...a11yProps(0)}
          sx={{ flexGrow: 1, maxWidth: 'none' }}
        />
        <Tab
          label="Subscriptions"
          {...a11yProps(1)}
          sx={{ flexGrow: 1, maxWidth: 'none' }}
        />
        {canWritePosts.includes(user.role) && (
          <Tab
            label="My news"
            {...a11yProps(2)}
            sx={{ flexGrow: 1, maxWidth: 'none' }}
          />
        )}
      </Tabs>
      <TabPanel value={tab} index={0}>
        <TabAllPosts />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <TabSubscriptions />
      </TabPanel>
      {canWritePosts.includes(user.role) && (
        <TabPanel value={tab} index={2}>
          <TabMyPosts />
        </TabPanel>
      )}
    </>
  );
};
