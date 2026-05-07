import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navItems = [
  { key: 'dashboard', path: '/admin', icon: <DashboardRoundedIcon /> },
  { key: 'products', path: '/admin/products', icon: <InventoryRoundedIcon /> },
  { key: 'about', path: '/admin/about', icon: <InfoRoundedIcon /> },
];

export default function Sidebar({ drawerWidth, mobileOpen, onClose, isMobile }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        py: 2,
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          px: 3,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mb: 1,
        }}
      >
        <Avatar
          sx={{
            width: 42,
            height: 42,
            background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
            boxShadow: '0 0 20px rgba(0,229,255,0.3)',
          }}
        >
          <AutoAwesomeIcon sx={{ fontSize: 22, color: '#0A0E17' }} />
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Outfit", sans-serif',
              fontWeight: 800,
              fontSize: '1.1rem',
              letterSpacing: '0.15em',
              background: 'linear-gradient(135deg, #00E5FF 0%, #FFB300 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1.2,
            }}
          >
            {t('sidebar.brand')}
          </Typography>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontSize: '0.6rem', lineHeight: 1 }}
          >
            {t('sidebar.subtitle')}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(0,229,255,0.06)', mx: 2, mb: 1 }} />

      {/* Nav Items */}
      <List sx={{ px: 1, flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.key}
            selected={isActive(item.path)}
            onClick={() => {
              navigate(item.path);
              if (isMobile) onClose();
            }}
            sx={{
              mb: 0.5,
              py: 1.3,
              '& .MuiListItemIcon-root': {
                color: isActive(item.path) ? '#00E5FF' : 'text.secondary',
                minWidth: 42,
                transition: 'color 0.2s ease',
              },
              '& .MuiListItemText-primary': {
                fontWeight: isActive(item.path) ? 700 : 500,
                fontSize: '0.875rem',
                color: isActive(item.path) ? '#E8ECF4' : 'text.secondary',
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={t(`sidebar.${item.key}`)} />
            {isActive(item.path) && (
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: '#00E5FF',
                  boxShadow: '0 0 10px #00E5FF',
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      {/* Bottom section */}
      <Box sx={{ px: 3, py: 2 }}>
        <Divider sx={{ borderColor: 'rgba(0,229,255,0.06)', mb: 2 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: '#1A2235',
              border: '1px solid rgba(0,229,255,0.2)',
              fontSize: '0.85rem',
              fontWeight: 700,
            }}
          >
            A
          </Avatar>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
              Admin User
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
              admin@aether.design
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
