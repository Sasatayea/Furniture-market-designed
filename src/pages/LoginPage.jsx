import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, TextField, Button, Card, CardContent,
  Divider, Container, InputAdornment, Alert,
} from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleEmailLogin(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields'); return; }
    const userData = { name: email.split('@')[0], email, picture: 'https://via.placeholder.com/100', type: 'email' };
    dispatch(setUser(userData));
    navigate('/UserInfo');
  }

  function handleGoogleSuccess(credentialResponse) {
    const decoded = jwtDecode(credentialResponse.credential);
    dispatch(setUser({ name: decoded.name, email: decoded.email, picture: decoded.picture, type: 'google' }));
    navigate('/UserInfo');
  }

  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6, position: 'relative', overflow: 'hidden',
      '&::before': { content: '""', position: 'absolute', top: '-30%', right: '-15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)', borderRadius: '50%' },
      '&::after': { content: '""', position: 'absolute', bottom: '-20%', left: '-10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,179,0,0.04) 0%, transparent 70%)', borderRadius: '50%' },
    }}>
      <Container maxWidth="xs">
        <Card sx={{ background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)', border: '1px solid rgba(0,229,255,0.08)', borderRadius: 5, overflow: 'visible', position: 'relative' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: -3 }}>
            <Box sx={{ width: 56, height: 56, borderRadius: 3, background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(0,229,255,0.3)' }}>
              <AutoAwesomeIcon sx={{ fontSize: 28, color: '#0A0E17' }} />
            </Box>
          </Box>

          <CardContent sx={{ p: { xs: 3, sm: 4 }, pt: 3 }}>
            <Typography variant="h5" sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 800, textAlign: 'center', mb: 0.5, color: '#E8ECF4' }}>Welcome Back</Typography>
            <Typography sx={{ textAlign: 'center', color: '#6B7A90', fontSize: '0.82rem', mb: 3 }}>Sign in to your AETHER account</Typography>

            {error && <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(255,82,82,0.1)', color: '#FF5252', border: '1px solid rgba(255,82,82,0.2)', borderRadius: 3, fontSize: '0.8rem' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleEmailLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField fullWidth placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailRoundedIcon sx={{ color: '#6B7A90', fontSize: 18 }} /></InputAdornment> }}
                sx={{ '& input': { color: '#E8ECF4', fontSize: '0.85rem' }, '& input::placeholder': { color: '#6B7A90', opacity: 1 } }}
              />
              <TextField fullWidth placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password"
                InputProps={{ startAdornment: <InputAdornment position="start"><LockRoundedIcon sx={{ color: '#6B7A90', fontSize: 18 }} /></InputAdornment> }}
                sx={{ '& input': { color: '#E8ECF4', fontSize: '0.85rem' }, '& input::placeholder': { color: '#6B7A90', opacity: 1 } }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ py: 1.3, fontSize: '0.85rem', mt: 1 }}>Sign In</Button>
            </Box>

            <Divider sx={{ my: 3, borderColor: 'rgba(0,229,255,0.06)', '&::before, &::after': { borderColor: 'rgba(0,229,255,0.06)' } }}>
              <Typography sx={{ color: '#4A5568', fontSize: '0.7rem', fontFamily: '"Outfit", sans-serif', letterSpacing: '0.1em', px: 2 }}>OR</Typography>
            </Divider>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google login failed')} theme="filled_black" shape="pill" />
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}