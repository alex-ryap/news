// CONSTANTS
export const USER_ROLES = {
  admin: 'Admin',
  writer: 'Writer',
  reader: 'Reader',
};

export const POSTS_PER_PAGE = 10;

export const CAN_WRITE_POSTS = ['writer', 'admin'];
export const SNACK_TIMEOUT = 3000;
export const ERRORS = new Map();
ERRORS.set(401, 'You unauthorized');
ERRORS.set(403, 'Forbidden for current role');
ERRORS.set(404, 'Not found');

// LOCAL STORAGE
export const TOKEN = 'token';

// SERVER
export const SERVER_ADDR = 'http://localhost:3001/';

// PAGES
export const LOGIN_PAGE = '/login';

export const HOME_PAGE = '/';
export const SUBSCRIPTIONS_PAGE = '/subscriptions';
export const MY_POSTS_PAGE = '/posts/my';
export const POST_CREATE = '/posts/new';
export const POST_ITEM_PAGE = '/posts/:id';
export const POST_ITEM_EDIT_PAGE = '/posts/:id/edit';

export const PROFILE_PAGE = '/profile';
export const ADMIN_PAGE = '/admin';
export const ADMIN_USER_POSTS = '/admin/:id/posts';
