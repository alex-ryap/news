import { AdminPage } from './pages/AdminPage';
import { HomePage } from './pages/HomePage';
import { MyPostsPage } from './pages/MyPostsPage';
import { PostEditPage } from './pages/PostEditPage';
import { PostPage } from './pages/PostPage';
import { ProfilePage } from './pages/ProfilePage';
import { SubscriptionsPage } from './pages/SubscriptionsPage';
import { UserPostsPage } from './pages/UserPostsPage';
import {
  ADMIN_PAGE,
  ADMIN_USER_POSTS,
  HOME_PAGE,
  MY_POSTS_PAGE,
  POST_CREATE,
  POST_ITEM_EDIT_PAGE,
  POST_ITEM_PAGE,
  PROFILE_PAGE,
  SUBSCRIPTIONS_PAGE,
} from './utils/constants';
import { IRoute } from './utils/interfaces';

export const privateRoutes: IRoute[] = [
  {
    path: HOME_PAGE,
    component: HomePage,
    access: ['reader', 'writer', 'admin'],
  },
  {
    path: SUBSCRIPTIONS_PAGE,
    component: SubscriptionsPage,
    access: ['reader', 'writer', 'admin'],
  },
  {
    path: MY_POSTS_PAGE,
    component: MyPostsPage,
    access: ['writer', 'admin'],
  },
  {
    path: POST_CREATE,
    component: PostEditPage,
    access: ['writer', 'admin'],
  },
  {
    path: POST_ITEM_PAGE,
    component: PostPage,
    access: ['reader', 'writer', 'admin'],
  },
  {
    path: POST_ITEM_EDIT_PAGE,
    component: PostEditPage,
    access: ['writer', 'admin'],
  },
  {
    path: PROFILE_PAGE,
    component: ProfilePage,
    access: ['reader', 'writer', 'admin'],
  },
  {
    path: ADMIN_PAGE,
    component: AdminPage,
    access: ['admin'],
  },
  {
    path: ADMIN_USER_POSTS,
    component: UserPostsPage,
    access: ['admin'],
  },
];
