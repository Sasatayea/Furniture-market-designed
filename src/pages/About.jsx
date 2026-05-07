import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { useTranslation } from 'react-i18next';

const teamMembers = [
  { name: 'Elena Rossi', role: 'CEO & Founder', avatar: 'E', color: '#00E5FF' },
  { name: 'Marco Bellini', role: 'Head of Design', avatar: 'M', color: '#FFB300' },
  { name: 'Sofia Tanaka', role: 'Lead Engineer', avatar: 'S', color: '#00E676' },
  { name: 'Karim Abdel', role: 'Operations Director', avatar: 'K', color: '#BB86FC' },
];

const stats = [
  { key: 'statsYears', value: '12+' },
  { key: 'statsProducts', value: '2,400+' },
  { key: 'statsCustomers', value: '50,000+' },
  { key: 'statsCountries', value: '32' },
];

export default function About() {
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
      {/* Hero Section */}
      <Card
        sx={{
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #0D1321 0%, #1A2235 50%, #111827 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
            borderRadius: '50%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,179,0,0.06) 0%, transparent 70%)',
            borderRadius: '50%',
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 4, md: 6 },
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 72,
              height: 72,
              mx: 'auto',
              mb: 3,
              background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
              boxShadow: '0 0 40px rgba(0,229,255,0.3)',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 36, color: '#0A0E17' }} />
          </Avatar>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontFamily: '"Outfit", sans-serif',
              mb: 2,
              background: 'linear-gradient(135deg, #E8ECF4 0%, #00E5FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.8rem', md: '2.4rem' },
            }}
          >
            {t('about.title')}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: '1rem',
            }}
          >
            {t('about.heroSubtitle')}
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.key}>
            <Card sx={{ textAlign: 'center' }}>
              <CardContent sx={{ py: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontFamily: '"Outfit", sans-serif',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    background: 'linear-gradient(135deg, #00E5FF 0%, #FFB300 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', fontSize: '0.8rem' }}
                >
                  {t(`about.${stat.key}`)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mission & Vision */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <RocketLaunchRoundedIcon sx={{ fontSize: 22, color: '#0A0E17' }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}
                >
                  {t('about.missionTitle')}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8 }}
              >
                {t('about.missionText')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2.5,
                    background: 'linear-gradient(135deg, #FFB300 0%, #C68400 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <VisibilityRoundedIcon sx={{ fontSize: 22, color: '#0A0E17' }} />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}
                >
                  {t('about.visionTitle')}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8 }}
              >
                {t('about.visionText')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Team Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <GroupsRoundedIcon sx={{ color: '#00E5FF', fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif' }}
            >
              {t('about.teamTitle')}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {teamMembers.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member.name}>
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 4,
                    border: '1px solid rgba(0,229,255,0.06)',
                    bgcolor: 'rgba(26,34,53,0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: `${member.color}40`,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 0 30px ${member.color}15`,
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 2,
                      bgcolor: `${member.color}20`,
                      color: member.color,
                      fontWeight: 800,
                      fontSize: '1.3rem',
                      fontFamily: '"Outfit", sans-serif',
                      border: `2px solid ${member.color}40`,
                    }}
                  >
                    {member.avatar}
                  </Avatar>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: '0.95rem', mb: 0.3 }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: member.color, fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    {member.role}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Section */}
      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, fontFamily: '"Outfit", sans-serif', mb: 1 }}
          >
            {t('about.contactTitle')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            {t('about.contactText')}
          </Typography>

          <Divider sx={{ borderColor: 'rgba(0,229,255,0.06)', mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              { icon: <EmailRoundedIcon />, text: t('about.email'), color: '#00E5FF' },
              { icon: <PhoneRoundedIcon />, text: t('about.phone'), color: '#00E676' },
              { icon: <LocationOnRoundedIcon />, text: t('about.address'), color: '#FFB300' },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: 2,
                    bgcolor: `${item.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.9rem' }}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
