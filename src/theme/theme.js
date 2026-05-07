import { createTheme } from '@mui/material/styles';

const getDesignTokens = (direction = 'ltr') => ({
  direction,
  palette: {
    mode: 'dark',
    primary: {
      main: '#00E5FF',
      light: '#6EFFFF',
      dark: '#00B2CC',
      contrastText: '#0A0E17',
    },
    secondary: {
      main: '#FFB300',
      light: '#FFE54C',
      dark: '#C68400',
      contrastText: '#0A0E17',
    },
    background: {
      default: '#0A0E17',
      paper: '#111827',
    },
    surface: {
      main: '#1A2235',
      light: '#222D42',
      dark: '#0D1321',
    },
    text: {
      primary: '#E8ECF4',
      secondary: '#8B95A8',
      disabled: '#4A5568',
    },
    divider: 'rgba(0, 229, 255, 0.08)',
    error: {
      main: '#FF5252',
      light: '#FF7B7B',
      dark: '#D32F2F',
    },
    warning: {
      main: '#FFB300',
      light: '#FFE54C',
      dark: '#C68400',
    },
    success: {
      main: '#00E676',
      light: '#66FFA6',
      dark: '#00B248',
    },
    info: {
      main: '#00E5FF',
      light: '#6EFFFF',
      dark: '#00B2CC',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontWeight: 500,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
      fontSize: '0.7rem',
    },
    body1: {
      letterSpacing: '0.01em',
      lineHeight: 1.7,
    },
    body2: {
      letterSpacing: '0.01em',
      lineHeight: 1.6,
    },
    button: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'none',
    },
    overline: {
      fontFamily: '"Outfit", "DM Sans", sans-serif',
      fontWeight: 600,
      letterSpacing: '0.12em',
      fontSize: '0.65rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.4)',
    '0 2px 6px rgba(0,0,0,0.4)',
    '0 4px 12px rgba(0,0,0,0.4)',
    '0 6px 16px rgba(0,0,0,0.4)',
    '0 8px 24px rgba(0,0,0,0.5)',
    '0 12px 32px rgba(0,0,0,0.5)',
    '0 16px 40px rgba(0,0,0,0.5)',
    '0 0 20px rgba(0,229,255,0.08)',  // teal glow
    '0 0 30px rgba(0,229,255,0.12)',  // stronger teal glow
    '0 0 40px rgba(0,229,255,0.15)',  // accent glow
    ...Array(14).fill('0 8px 24px rgba(0,0,0,0.5)'),
  ],
});

export function createAppTheme(direction = 'ltr') {
  const tokens = getDesignTokens(direction);

  return createTheme({
    ...tokens,
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#0A0E17',
            scrollbarWidth: 'thin',
            scrollbarColor: '#1A2235 #0A0E17',
            '&::-webkit-scrollbar': {
              width: 6,
            },
            '&::-webkit-scrollbar-track': {
              background: '#0A0E17',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#1A2235',
              borderRadius: 3,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)',
            border: '1px solid rgba(0, 229, 255, 0.06)',
            borderRadius: 16,
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              border: '1px solid rgba(0, 229, 255, 0.15)',
              boxShadow: '0 0 30px rgba(0, 229, 255, 0.08)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            padding: '10px 24px',
            fontSize: '0.875rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.2)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #00E5FF 0%, #00B2CC 100%)',
            color: '#0A0E17',
            fontWeight: 700,
            '&:hover': {
              background: 'linear-gradient(135deg, #6EFFFF 0%, #00E5FF 100%)',
            },
          },
          outlined: {
            borderColor: 'rgba(0, 229, 255, 0.3)',
            color: '#00E5FF',
            '&:hover': {
              borderColor: '#00E5FF',
              background: 'rgba(0, 229, 255, 0.08)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 10,
              background: 'rgba(26, 34, 53, 0.6)',
              '& fieldset': {
                borderColor: 'rgba(0, 229, 255, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 229, 255, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#00E5FF',
              },
            },
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: 'linear-gradient(180deg, #0D1321 0%, #111827 100%)',
            borderRight: '1px solid rgba(0, 229, 255, 0.06)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'rgba(10, 14, 23, 0.8)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 229, 255, 0.06)',
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
            fontSize: '0.75rem',
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            background: 'linear-gradient(135deg, #111827 0%, #1A2235 100%)',
            border: '1px solid rgba(0, 229, 255, 0.1)',
            borderRadius: 20,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(0, 229, 255, 0.06)',
          },
          head: {
            fontFamily: '"Outfit", "DM Sans", sans-serif',
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            color: '#8B95A8',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'rgba(0, 229, 255, 0.1)',
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            margin: '2px 8px',
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              background: 'rgba(0, 229, 255, 0.1)',
              borderLeft: '3px solid #00E5FF',
              '&:hover': {
                background: 'rgba(0, 229, 255, 0.15)',
              },
            },
            '&:hover': {
              background: 'rgba(0, 229, 255, 0.05)',
            },
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: {
            '& .MuiAlert-root': {
              borderRadius: 12,
              backdropFilter: 'blur(20px)',
            },
          },
        },
      },
    },
  });
}

export default createAppTheme;
