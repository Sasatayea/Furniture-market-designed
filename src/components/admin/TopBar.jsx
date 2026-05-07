import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function TopBar({ onMenuClick }) {
  const { t } = useTranslation();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: 'calc(100% - 280px)' },
        ml: { md: '280px' },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 1, px: { xs: 1.5, sm: 3 } }}>
        {/* Hamburger */}
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { md: 'none' }, color: 'text.primary' }}
        >
          <MenuRoundedIcon />
        </IconButton>

        {/* Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'rgba(26, 34, 53, 0.6)',
            borderRadius: 3,
            px: 2,
            py: 0.5,
            flexGrow: 1,
            maxWidth: 460,
            border: '1px solid rgba(0,229,255,0.06)',
            transition: 'border-color 0.2s',
            '&:focus-within': {
              borderColor: 'rgba(0,229,255,0.2)',
            },
          }}
        >
          <SearchRoundedIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
          <InputBase
            placeholder={t('topbar.search')}
            sx={{
              color: 'text.primary',
              fontSize: '0.85rem',
              flexGrow: 1,
              '& ::placeholder': {
                color: '#6B7A90',
                opacity: 1,
              },
            }}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Right actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LanguageSwitcher />

          <Tooltip title={t('topbar.notifications')}>
            <IconButton sx={{ color: 'text.secondary' }}>
              <Badge
                badgeContent={3}
                sx={{
                  '& .MuiBadge-badge': {
                    bgcolor: '#FFB300',
                    color: '#0A0E17',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    minWidth: 18,
                    height: 18,
                  },
                }}
              >
                <NotificationsNoneRoundedIcon sx={{ fontSize: 22 }} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title={t('topbar.profile')}>
            <IconButton sx={{ ml: 0.5 }}>
              <Avatar
                sx={{
                  width: 34,
                  height: 34,
                  background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#0A0E17',
                }}
              >
                A
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
