import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardCards from '../../components/admin/DashboardCards';
import SalesChart from '../../components/admin/SalesChart';
import UsersChart from '../../components/admin/UsersChart';
import ProductsPieChart from '../../components/admin/ProductsPieChart';
import RecentOrders from '../../components/admin/RecentOrders';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        animation: 'fadeInUp 0.5s ease-out',
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Page Title */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontFamily: '"Outfit", sans-serif',
            background: 'linear-gradient(135deg, #E8ECF4 0%, #8B95A8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 0.5,
          }}
        >
          {t('dashboard.title')}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('dashboard.vsLastMonth')}
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Box sx={{ mb: 4 }}>
        <DashboardCards />
      </Box>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <SalesChart />
        </Grid>
        <Grid item xs={12} lg={4}>
          <ProductsPieChart />
        </Grid>
      </Grid>

      {/* Second Row */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={5}>
          <UsersChart />
        </Grid>
        <Grid item xs={12} lg={7}>
          <RecentOrders />
        </Grid>
      </Grid>
    </Box>
  );
}
