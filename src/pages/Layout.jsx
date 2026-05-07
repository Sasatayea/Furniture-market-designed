import Footer from '../components/Footer';
import Navebare from '../components/Navebare';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';

export default function Layout() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Navebare />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}