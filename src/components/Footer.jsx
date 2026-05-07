import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Container,
} from '@mui/material';

const footerSections = [
  {
    title: 'CUSTOMER CARE',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Shipping & Returns', to: '/shipping' },
      { label: 'Size Guide', to: '/size-guide' },
    ],
  },
  {
    title: 'LEGAL',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Cookie Policy', to: '/cookies' },
    ],
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0D1321',
        borderTop: '1px solid rgba(0,229,255,0.06)',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              sx={{
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '0.15em',
                color: '#E8ECF4',
                mb: 1.5,
              }}
            >
              AETHER
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: '#6B7A90', lineHeight: 1.8, fontSize: '0.8rem', maxWidth: 300 }}
            >
              Crafting the future of luxury through sustainable precision and
              timeless silhouettes. Designed in Milan, sourced globally.
            </Typography>
          </Grid>

          {/* Link sections */}
          {footerSections.map((section) => (
            <Grid size={{ xs: 6, md: 2 }} key={section.title}>
              <Typography
                variant="overline"
                sx={{
                  color: '#8B95A8',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 700,
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  mb: 2,
                  display: 'block',
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {section.links.map((link) => (
                  <Typography
                    key={link.to}
                    component={Link}
                    to={link.to}
                    sx={{
                      color: '#6B7A90',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      transition: 'color 0.2s',
                      '&:hover': { color: '#00E5FF' },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="overline"
              sx={{
                color: '#8B95A8',
                fontFamily: '"Outfit", sans-serif',
                fontWeight: 700,
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                mb: 2,
                display: 'block',
              }}
            >
              NEWSLETTER
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Your Email"
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    fontSize: '0.8rem',
                    bgcolor: 'rgba(26, 34, 53, 0.6)',
                    '& fieldset': { borderColor: 'rgba(0,229,255,0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(0,229,255,0.25)' },
                    '&.Mui-focused fieldset': { borderColor: '#00E5FF' },
                  },
                  '& input': { color: '#E8ECF4' },
                  '& input::placeholder': { color: '#6B7A90', opacity: 1 },
                }}
              />
              <Button
                variant="outlined"
                sx={{
                  whiteSpace: 'nowrap',
                  borderColor: 'rgba(0,229,255,0.3)',
                  color: '#00E5FF',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  borderRadius: 2,
                  px: 2.5,
                  '&:hover': {
                    borderColor: '#00E5FF',
                    bgcolor: 'rgba(0,229,255,0.08)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(0,229,255,0.04)', my: 3 }} />

        <Typography
          sx={{
            textAlign: 'center',
            color: '#4A5568',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            fontFamily: '"Outfit", sans-serif',
          }}
        >
          © 2024 AETHER LUXURY. ALL RIGHTS RESERVED.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;