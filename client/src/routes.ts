import { HomePage } from './pages/HomePage';
import { PostEditPage } from './pages/PostEditPage';
import { PostPage } from './pages/PostPage';
import { ProfilePage } from './pages/ProfilePage';
import { TagsPage } from './pages/TagsPage';
import { UsersPage } from './pages/UsersPage';
import {
  HOME_PAGE,
  POST_CREATE,
  POST_ITEM_EDIT_PAGE,
  POST_ITEM_PAGE,
  PROFILE_PAGE,
  TAGS_PAGE,
  USERS_PAGE,
} from './utils/constants';
import { IRoute } from './utils/interfaces';

export const privateRoutes: IRoute[] = [
  {
    path: HOME_PAGE,
    component: HomePage,
    access: ['reader', 'writer', 'admin'],
  },
  {
    path: POST_CREATE,
    component: PostEditPage,
    access: ['writer', 'admin'],
  },
  {
    path: POST_ITEM_PAGE,
    component: PostPage,
    access: ['writer', 'admin'],
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
    path: USERS_PAGE,
    component: UsersPage,
    access: ['admin'],
  },
  {
    path: TAGS_PAGE,
    component: TagsPage,
    access: ['admin'],
  },
];
