import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { month: 'Jan', users: 320 },
  { month: 'Feb', users: 480 },
  { month: 'Mar', users: 520 },
  { month: 'Apr', users: 610 },
  { month: 'May', users: 750 },
  { month: 'Jun', users: 890 },
  { month: 'Jul', users: 1020 },
  { month: 'Aug', users: 940 },
  { month: 'Sep', users: 1150 },
  { month: 'Oct', users: 1280 },
  { month: 'Nov', users: 1100 },
  { month: 'Dec', users: 1420 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: '#1A2235',
          border: '1px solid rgba(0,230,118,0.2)',
          borderRadius: 2,
          p: 1.5,
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        <Typography sx={{ fontSize: '0.7rem', color: '#8B95A8', mb: 0.3 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#00E676' }}>
          {payload[0].value.toLocaleString()} users
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function UsersChart() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
              {t('dashboard.userGrowth')}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
              {t('dashboard.monthly')} 2024
            </Typography>
          </Box>
          <Box
            sx={{
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              bgcolor: 'rgba(0,229,255,0.1)',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#00E5FF' }}>
              +18.3%
            </Typography>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="usersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E676" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00E676" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0,229,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7A90', fontSize: 11 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7A90', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,229,255,0.04)' }} />
            <Bar
              dataKey="users"
              fill="url(#usersGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
