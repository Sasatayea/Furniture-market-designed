import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const orders = [
  {
    id: '#ORD-7291',
    customer: 'Sarah Mitchell',
    avatar: 'S',
    product: 'Meridian Lounge Chair',
    amount: '$1,299',
    status: 'delivered',
    date: '2024-12-01',
  },
  {
    id: '#ORD-7290',
    customer: 'James Chen',
    avatar: 'J',
    product: 'Eclipse Dining Table',
    amount: '$2,499',
    status: 'processing',
    date: '2024-12-01',
  },
  {
    id: '#ORD-7289',
    customer: 'Amira Hassan',
    avatar: 'A',
    product: 'Horizon Platform Bed',
    amount: '$1,899',
    status: 'pending',
    date: '2024-11-30',
  },
  {
    id: '#ORD-7288',
    customer: 'Lucas Meyer',
    avatar: 'L',
    product: 'Prism Bookshelf',
    amount: '$899',
    status: 'delivered',
    date: '2024-11-30',
  },
  {
    id: '#ORD-7287',
    customer: 'Olivia Kim',
    avatar: 'O',
    product: 'Zenith Executive Desk',
    amount: '$1,799',
    status: 'cancelled',
    date: '2024-11-29',
  },
];

const statusColors = {
  delivered: { bg: 'rgba(0,230,118,0.1)', color: '#00E676' },
  processing: { bg: 'rgba(0,229,255,0.1)', color: '#00E5FF' },
  pending: { bg: 'rgba(255,179,0,0.1)', color: '#FFB300' },
  cancelled: { bg: 'rgba(255,82,82,0.1)', color: '#FF5252' },
};

export default function RecentOrders() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 2.5 }}>
          {t('dashboard.recentOrders')}
        </Typography>

        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>{t('dashboard.orderId')}</TableCell>
                <TableCell>{t('dashboard.customer')}</TableCell>
                <TableCell>{t('dashboard.product')}</TableCell>
                <TableCell>{t('dashboard.amount')}</TableCell>
                <TableCell>{t('dashboard.status')}</TableCell>
                <TableCell>{t('dashboard.date')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    '&:hover': { bgcolor: 'rgba(0,229,255,0.02)' },
                    transition: 'background 0.2s',
                  }}
                >
                  <TableCell>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#00E5FF' }}>
                      {order.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          bgcolor: '#1A2235',
                          border: '1px solid rgba(0,229,255,0.15)',
                          color: '#00E5FF',
                        }}
                      >
                        {order.avatar}
                      </Avatar>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 500 }}>
                        {order.customer}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                      {order.product}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 700 }}>
                      {order.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={t(`dashboard.${order.status}`)}
                      size="small"
                      sx={{
                        bgcolor: statusColors[order.status].bg,
                        color: statusColors[order.status].color,
                        fontWeight: 700,
                        fontSize: '0.65rem',
                        height: 24,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                      {order.date}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
