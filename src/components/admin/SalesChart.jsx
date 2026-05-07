import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { month: 'Jan', sales: 4200 },
  { month: 'Feb', sales: 5800 },
  { month: 'Mar', sales: 4900 },
  { month: 'Apr', sales: 7200 },
  { month: 'May', sales: 6800 },
  { month: 'Jun', sales: 9100 },
  { month: 'Jul', sales: 8400 },
  { month: 'Aug', sales: 10200 },
  { month: 'Sep', sales: 9600 },
  { month: 'Oct', sales: 11800 },
  { month: 'Nov', sales: 10400 },
  { month: 'Dec', sales: 13200 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: '#1A2235',
          border: '1px solid rgba(0,229,255,0.2)',
          borderRadius: 2,
          p: 1.5,
          boxShadow: '0 0 20px rgba(0,0,0,0.4)',
        }}
      >
        <Typography sx={{ fontSize: '0.7rem', color: '#8B95A8', mb: 0.3 }}>
          {label}
        </Typography>
        <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#00E5FF' }}>
          ${payload[0].value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function SalesChart() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
              {t('dashboard.salesOverview')}
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
              bgcolor: 'rgba(0,230,118,0.1)',
            }}
          >
            <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#00E676' }}>
              +23.5%
            </Typography>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
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
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#00E5FF"
              strokeWidth={2.5}
              fill="url(#salesGradient)"
              dot={false}
              activeDot={{
                r: 6,
                fill: '#00E5FF',
                stroke: '#0A0E17',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
