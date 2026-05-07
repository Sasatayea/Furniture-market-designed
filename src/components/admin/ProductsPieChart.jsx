import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { name: 'Living Room', value: 35 },
  { name: 'Bedroom', value: 25 },
  { name: 'Office', value: 18 },
  { name: 'Kitchen', value: 12 },
  { name: 'Outdoor', value: 7 },
  { name: 'Bathroom', value: 3 },
];

const COLORS = ['#00E5FF', '#00E676', '#FFB300', '#FF5252', '#BB86FC', '#64FFDA'];

const CustomTooltip = ({ active, payload }) => {
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
        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#E8ECF4' }}>
          {payload[0].name}
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', color: payload[0].payload.fill }}>
          {payload[0].value}%
        </Typography>
      </Box>
    );
  }
  return null;
};

export default function ProductsPieChart() {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>
          {t('dashboard.productCategories')}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                    style={{
                      filter: `drop-shadow(0 0 6px ${COLORS[index % COLORS.length]}40)`,
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2, minWidth: 140 }}>
            {data.map((item, index) => (
              <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '3px',
                    bgcolor: COLORS[index],
                    boxShadow: `0 0 6px ${COLORS[index]}60`,
                  }}
                />
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', flex: 1 }}>
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'text.primary' }}>
                  {item.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
