import './App.css';
import { lazy, Suspense, useMemo, useEffect } from 'react';
import Home from './pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider, CssBaseline, CircularProgress, Box } from '@mui/material';
import { createAppTheme } from './theme/theme';
import { useTranslation } from 'react-i18next';

const NotFound = lazy(() => import('./pages/NotFound'));
const Layout = lazy(() => import('./pages/Layout'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const UserInfo = lazy(() => import('./pages/UserInfo'));
const Shoppingbag = lazy(() => import('./pages/ShoppingBag'));
const Aboutt = lazy(() => import('./pages/About'));
const FavoritePage = lazy(() => import('./pages/FavoritePage'));
const FurnitureDetail = lazy(() => import('./pages/FurnitureDetail'));

// Admin pages
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Products = lazy(() => import('./pages/admin/Products'));
const About = lazy(() => import('./pages/admin/About'));

const LoadingFallback = () => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      bgcolor: '#0A0E17',
    }}
  >
    <CircularProgress sx={{ color: '#00E5FF' }} />
  </Box>
);

function AppContent() {
  const { i18n } = useTranslation();

  const theme = useMemo(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    return createAppTheme(dir);
  }, [i18n.language]);

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.dir = dir;
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'UserInfo', element: <UserInfo /> },
        { path: 'Shoppingbag', element: <Shoppingbag /> },
        { path: 'FavoritePage', element: <FavoritePage /> },
        { path: 'About', element: <Aboutt /> },
        { path: 'FurnitureDetail', element: <FurnitureDetail /> },
      ],
    },
    {
      path: '/admin',
      element: <AdminLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'products', element: <Products /> },
        { path: 'about', element: <About /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
