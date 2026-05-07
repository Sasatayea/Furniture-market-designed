import { Link } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Card, CardContent, Button,
  Avatar, Divider, Chip,
} from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';

export default function UserInfoPage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser());
    navigate('/');
  }

  if (!user) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'rgba(0,229,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <PersonOutlineRoundedIcon sx={{ fontSize: 36, color: '#00E5FF', opacity: 0.5 }} />
          </Box>
          <Typography variant="h6" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, color: '#E8ECF4', mb: 1 }}>
            Not signed in
          </Typography>
          <Typography sx={{ color: '#6B7A90', fontSize: '0.85rem', mb: 3 }}>
            Sign in to view your profile
          </Typography>
          <Button component={Link} to="/login" variant="contained" startIcon={<LoginRoundedIcon />} sx={{ px: 4 }}>
            Go to Login
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '70vh' }}>
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 6 } }}>
        <Card sx={{
          background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)',
          border: '1px solid rgba(0,229,255,0.08)',
          borderRadius: 5,
          overflow: 'visible',
          position: 'relative',
        }}>
          {/* Avatar - floating above card */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -5 }}>
            <Avatar
              src={user.picture}
              sx={{
                width: 96, height: 96,
                border: '4px solid #111827',
                boxShadow: '0 0 30px rgba(0,229,255,0.15)',
                bgcolor: '#1A2235',
                fontSize: '2rem',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 700,
              }}
            >
              {user.name?.[0]?.toUpperCase()}
            </Avatar>
          </Box>

          <CardContent sx={{ p: { xs: 3, sm: 4 }, pt: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, color: '#E8ECF4', mb: 0.5 }}>
              {user.name}
            </Typography>

            <Chip
              label={user.type === 'google' ? 'Google Account' : 'Email Account'}
              size="small"
              sx={{
                bgcolor: user.type === 'google' ? 'rgba(0,229,255,0.08)' : 'rgba(255,179,0,0.08)',
                color: user.type === 'google' ? '#00E5FF' : '#FFB300',
                fontWeight: 600, fontSize: '0.65rem', mb: 3,
                fontFamily: '"Outfit", sans-serif',
              }}
            />

            <Divider sx={{ borderColor: 'rgba(0,229,255,0.06)', mb: 3 }} />

            {/* Info rows */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, textAlign: 'left' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 3, bgcolor: 'rgba(26,34,53,0.5)' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(0,229,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BadgeRoundedIcon sx={{ fontSize: 18, color: '#00E5FF' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.65rem', color: '#6B7A90', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: '"Outfit", sans-serif', fontWeight: 600 }}>Full Name</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#E8ECF4', fontWeight: 500 }}>{user.name}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 3, bgcolor: 'rgba(26,34,53,0.5)' }}>
                <Box sx={{ width: 36, height: 36, borderRadius: 2, bgcolor: 'rgba(0,230,118,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <EmailRoundedIcon sx={{ fontSize: 18, color: '#00E676' }} />
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.65rem', color: '#6B7A90', textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: '"Outfit", sans-serif', fontWeight: 600 }}>Email</Typography>
                  <Typography sx={{ fontSize: '0.88rem', color: '#E8ECF4', fontWeight: 500 }}>{user.email}</Typography>
                </Box>
              </Box>
            </Box>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<LogoutRoundedIcon />}
              onClick={handleLogout}
              sx={{
                py: 1.2, fontSize: '0.85rem',
                borderColor: 'rgba(255,82,82,0.3)', color: '#FF5252',
                '&:hover': { borderColor: '#FF5252', bgcolor: 'rgba(255,82,82,0.08)', boxShadow: '0 0 20px rgba(255,82,82,0.15)' },
              }}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}