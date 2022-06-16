import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { MyPostsPage } from './pages/MyPostsPage';
import { PostEditPage } from './pages/PostEditPage';
import { PostPage } from './pages/PostPage';
import { ProfilePage } from './pages/ProfilePage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { UserPostsPage } from './pages/UserPostsPage';
import {
  ADMIN_ONLY,
  ADMIN_PAGE,
  ADMIN_USER_POSTS,
  ALL,
  HOME_PAGE,
  MY_POSTS_PAGE,
  POST_CREATE,
  POST_ITEM_EDIT_PAGE,
  POST_ITEM_PAGE,
  PROFILE_PAGE,
  SUBSCRIPTIONS_PAGE,
  WRITERS_ONLY,
} from './utils/constants';
import { IRoute } from './utils/interfaces';

export const privateRoutes: IRoute[] = [
  {
    path: HOME_PAGE,
    component: HomePage,
    access: ALL,
  },
  {
    path: SUBSCRIPTIONS_PAGE,
    component: SubscriptionsPage,
    access: ALL,
  },
  {
    path: MY_POSTS_PAGE,
    component: MyPostsPage,
    access: WRITERS_ONLY,
  },
  {
    path: POST_CREATE,
    component: PostEditPage,
    access: WRITERS_ONLY,
  },
  {
    path: POST_ITEM_PAGE,
    component: PostPage,
    access: ALL,
  },
  {
    path: POST_ITEM_EDIT_PAGE,
    component: PostEditPage,
    access: WRITERS_ONLY,
  },
  {
    path: PROFILE_PAGE,
    component: ProfilePage,
    access: ALL,
  },
  {
    path: ADMIN_PAGE,
    component: AdminPage,
    access: ADMIN_ONLY,
  },
  {
    path: ADMIN_USER_POSTS,
    component: UserPostsPage,
    access: ADMIN_ONLY,
  },
];
