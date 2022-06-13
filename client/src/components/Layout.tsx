import { Container } from '@mui/material';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};
