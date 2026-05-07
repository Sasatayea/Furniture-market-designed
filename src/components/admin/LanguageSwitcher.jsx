import { IconButton, Tooltip, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const isArabic = i18n.language === 'ar';

  return (
    <Tooltip title={t('common.language')}>
      <IconButton
        onClick={toggleLanguage}
        sx={{
          color: 'text.secondary',
          borderRadius: 2,
          px: 1.5,
          py: 0.8,
          fontSize: '0.75rem',
          fontWeight: 700,
          fontFamily: '"Outfit", sans-serif',
          letterSpacing: '0.05em',
          border: '1px solid rgba(0,229,255,0.1)',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'rgba(0,229,255,0.3)',
            background: 'rgba(0,229,255,0.06)',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.8,
          }}
        >
          <span style={{ fontSize: '1rem' }}>{isArabic ? '🇺🇸' : '🇸🇦'}</span>
          <span>{isArabic ? 'EN' : 'AR'}</span>
        </Box>
      </IconButton>
    </Tooltip>
  );
}
