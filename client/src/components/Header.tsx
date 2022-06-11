import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import LogoutIcon from '@mui/icons-material/Logout';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ADMIN_PAGE,
  HOME_PAGE,
  MY_POSTS_PAGE,
  PROFILE_PAGE,
  SUBSCRIPTIONS_PAGE,
} from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { signOut } from '../store/auth/SignOut';

const pages = [
  {
    name: 'Home',
    link: HOME_PAGE,
    access: ['reader', 'writer', 'admin'],
  },
  {
    name: 'Subscriptions',
    link: SUBSCRIPTIONS_PAGE,
    access: ['reader', 'writer', 'admin'],
  },
  {
    name: 'My posts',
    link: MY_POSTS_PAGE,
    access: ['writer', 'admin'],
  },
  {
    name: 'Profile',
    link: PROFILE_PAGE,
    access: ['reader', 'writer', 'admin'],
  },
  {
    name: 'Admin',
    link: ADMIN_PAGE,
    access: ['admin'],
  },
];

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link: string) => {
    navigate(link);
    setAnchorElNav(null);
  };

  const handleOpenLink = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      navigate('/');
    },
    [navigate]
  );

  const handleSignOut = useCallback(() => {
    dispatch(signOut({}));
  }, [dispatch]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NewspaperIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            onClick={handleOpenLink}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            News
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages
                .filter((page) => page.access.includes(user.role))
                .map((page) => (
                  <MenuItem
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.link)}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <NewspaperIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            News
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages
              .filter((page) => page.access.includes(user.role))
              .map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.link)}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
          </Box>
          <Tooltip title="Logout">
            <IconButton
              aria-label="Sign out"
              sx={{ color: 'white' }}
              onClick={() => handleSignOut()}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
