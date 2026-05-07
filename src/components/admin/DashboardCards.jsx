import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useTranslation } from 'react-i18next';

const cardData = [
  {
    key: 'totalRevenue',
    value: '$128,430',
    change: '+12.5%',
    up: true,
    icon: AttachMoneyRoundedIcon,
    gradient: 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0.03) 100%)',
    iconBg: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
  },
  {
    key: 'totalUsers',
    value: '8,642',
    change: '+8.2%',
    up: true,
    icon: PeopleAltRoundedIcon,
    gradient: 'linear-gradient(135deg, rgba(0,230,118,0.15) 0%, rgba(0,230,118,0.03) 100%)',
    iconBg: 'linear-gradient(135deg, #00E676 0%, #00B248 100%)',
  },
  {
    key: 'totalProducts',
    value: '1,248',
    change: '+3.1%',
    up: true,
    icon: InventoryRoundedIcon,
    gradient: 'linear-gradient(135deg, rgba(255,179,0,0.15) 0%, rgba(255,179,0,0.03) 100%)',
    iconBg: 'linear-gradient(135deg, #FFB300 0%, #C68400 100%)',
  },
  {
    key: 'totalOrders',
    value: '3,467',
    change: '-2.4%',
    up: false,
    icon: ShoppingCartRoundedIcon,
    gradient: 'linear-gradient(135deg, rgba(255,82,82,0.15) 0%, rgba(255,82,82,0.03) 100%)',
    iconBg: 'linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)',
  },
];

export default function DashboardCards() {
  const { t } = useTranslation();

  return (
    <Grid container spacing={3}>
      {cardData.map((card) => {
        const IconComp = card.icon;
        return (
          <Grid item xs={12} sm={6} lg={3} key={card.key}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: card.iconBg,
                  opacity: 0.6,
                },
              }}
            >
              <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3,
                      background: card.iconBg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 0 20px ${card.iconBg.includes('#00E5FF') ? 'rgba(0,229,255,0.3)' : card.iconBg.includes('#00E676') ? 'rgba(0,230,118,0.3)' : card.iconBg.includes('#FFB300') ? 'rgba(255,179,0,0.3)' : 'rgba(255,82,82,0.3)'}`,
                    }}
                  >
                    <IconComp sx={{ fontSize: 24, color: '#0A0E17' }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.3,
                      px: 1,
                      py: 0.3,
                      borderRadius: 2,
                      bgcolor: card.up ? 'rgba(0,230,118,0.1)' : 'rgba(255,82,82,0.1)',
                    }}
                  >
                    {card.up ? (
                      <TrendingUpRoundedIcon sx={{ fontSize: 14, color: '#00E676' }} />
                    ) : (
                      <TrendingDownRoundedIcon sx={{ fontSize: 14, color: '#FF5252' }} />
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        color: card.up ? '#00E676' : '#FF5252',
                        fontSize: '0.7rem',
                      }}
                    >
                      {card.change}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1.5rem', sm: '1.75rem' },
                    mb: 0.5,
                    fontFamily: '"Outfit", sans-serif',
                  }}
                >
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
                  {t(`dashboard.${card.key}`)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
