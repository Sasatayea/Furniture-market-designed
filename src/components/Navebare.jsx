import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './admin/LanguageSwitcher';

const navLinks = [
  { labelKey: 'nav.collections', fallback: 'COLLECTIONS', to: '/' },
  { labelKey: 'nav.about', fallback: 'ABOUT', to: '/About' },
];

export default function Navebare() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const cartItems = useSelector((state) => state.cart.items || []);
  const favorites = useSelector((state) => state.favorite.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'rgba(10, 14, 23, 0.85)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.06)',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            minHeight: { xs: 64, md: 72 },
            justifyContent: 'space-between',
          }}
        >
          {/* Brand */}
          <Typography
            component={Link}
            to="/"
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 300,
              fontSize: '1.1rem',
              letterSpacing: '0.35em',
              color: '#E8ECF4',
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': { color: '#00E5FF' },
            }}
          >
            AETHER
          </Typography>

          {/* Desktop Nav Links */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 5, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              {navLinks.map((link) => (
                <Typography
                  key={link.to}
                  component={Link}
                  to={link.to}
                  sx={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    fontFamily: '"Outfit", sans-serif',
                    fontWeight: 500,
                    color: isActive(link.to) ? '#00E5FF' : '#8B95A8',
                    textDecoration: 'none',
                    position: 'relative',
                    py: 0.5,
                    transition: 'color 0.3s',
                    '&:hover': { color: '#E8ECF4' },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: isActive(link.to) ? '100%' : '0%',
                      height: '1.5px',
                      bgcolor: '#00E5FF',
                      transition: 'width 0.3s ease',
                      borderRadius: 1,
                    },
                    '&:hover::after': { width: '100%' },
                  }}
                >
                  {t(link.labelKey, link.fallback)}
                </Typography>
              ))}
            </Box>
          )}

          {/* Right Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 } }}>
            <LanguageSwitcher />

            <IconButton
              component={Link}
              to="/UserInfo"
              sx={{ color: '#8B95A8', '&:hover': { color: '#00E5FF' } }}
            >
              <PersonOutlineRoundedIcon sx={{ fontSize: 22 }} />
            </IconButton>

            <IconButton
              component={Link}
              to="/FavoritePage"
              sx={{ color: '#8B95A8', '&:hover': { color: '#FF5252' } }}
            >
              <Badge
                badgeContent={favorites.length || null}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#FF5252',
                    color: '#fff',
                    fontSize: '0.6rem',
                    minWidth: 16,
                    height: 16,
                  },
                }}
              >
                <FavoriteBorderRoundedIcon sx={{ fontSize: 22 }} />
              </Badge>
            </IconButton>

            <IconButton
              component={Link}
              to="/Shoppingbag"
              sx={{ color: '#8B95A8', '&:hover': { color: '#FFB300' } }}
            >
              <Badge
                badgeContent={cartCount || null}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#FFB300',
                    color: '#0A0E17',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    minWidth: 16,
                    height: 16,
                  },
                }}
              >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 22 }} />
              </Badge>
            </IconButton>

            {/* Mobile hamburger */}
            {isMobile && (
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{ color: '#8B95A8', ml: 0.5 }}
              >
                <MenuRoundedIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(180deg, #0D1321 0%, #111827 100%)',
            borderLeft: '1px solid rgba(0,229,255,0.06)',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 300,
              letterSpacing: '0.3em',
              fontSize: '0.9rem',
              color: '#E8ECF4',
            }}
          >
            AETHER
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#8B95A8' }}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.to}
              component={Link}
              to={link.to}
              selected={isActive(link.to)}
              onClick={() => setMobileOpen(false)}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText
                primary={t(link.labelKey, link.fallback)}
                primaryTypographyProps={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  fontFamily: '"Outfit", sans-serif',
                  fontWeight: isActive(link.to) ? 700 : 400,
                  color: isActive(link.to) ? '#00E5FF' : '#8B95A8',
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}