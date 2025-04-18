import { createTheme, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    status: {
      success: string;
      warning: string;
      danger: string;
      info: string;
      successLight: string;
      warningLight: string;
      dangerLight: string;
      infoLight: string;
    };
  }
  interface TypeBackground {
    light: string;
    subtle: string;
    gradient: string;
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    status?: {
      success: string;
      warning: string;
      danger: string;
      info: string;
      successLight: string;
      warningLight: string;
      dangerLight: string;
      infoLight: string;
    };
  }
}

// Modern clean color palette
const primaryMain = '#2563EB'; // Modern blue
const secondaryMain = '#2DD4BF'; // Teal
const tertiaryMain = '#8B5CF6'; // Purple

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryMain,
      light: '#60A5FA',
      dark: '#1E40AF',
      contrastText: '#ffffff',
    },
    secondary: {
      main: secondaryMain,
      light: '#5EEAD4',
      dark: '#0F766E',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: tertiaryMain,
      light: '#A78BFA',
      dark: '#6D28D9',
      contrastText: '#ffffff',
    },
    error: {
      main: '#F43F5E', // Modern red
      light: '#FDA4AF',
      dark: '#BE123C',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#F59E0B', // Modern amber
      light: '#FCD34D',
      dark: '#B45309',
      contrastText: '#ffffff',
    },
    success: {
      main: '#10B981', // Modern green
      light: '#6EE7B7',
      dark: '#047857',
      contrastText: '#ffffff',
    },
    info: {
      main: '#0EA5E9', // Light blue
      light: '#7DD3FC',
      dark: '#0369A1',
      contrastText: '#ffffff',
    },
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      danger: '#F43F5E',
      info: '#0EA5E9',
      successLight: '#ECFDF5',
      warningLight: '#FFFBEB',
      dangerLight: '#FEF2F2',
      infoLight: '#EFF6FF',
    },
    background: {
      default: '#F9FAFB', // Very light gray
      paper: '#ffffff',
      light: '#F3F4F6', // Light gray for alternating backgrounds
      subtle: '#F5F8FF', // Very light blue
      gradient: 'linear-gradient(145deg, #F3F4F6 0%, #EFF6FF 100%)',
    },
    text: {
      primary: '#1F2937', // Dark gray
      secondary: '#6B7280', // Medium gray
    },
    divider: 'rgba(0, 0, 0, 0.06)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      letterSpacing: '0.01em',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(16, 24, 40, 0.04)',
    '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
    '0px 4px 8px -2px rgba(16, 24, 40, 0.08), 0px 2px 4px -2px rgba(16, 24, 40, 0.04)',
    '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.04)',
    '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.04)',
    '0px 24px 32px -8px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.04)',
    '0px 32px 48px -8px rgba(16, 24, 40, 0.12), 0px 16px 24px -4px rgba(16, 24, 40, 0.04)',
    '0px 32px 64px -12px rgba(16, 24, 40, 0.12), 0px 24px 32px -8px rgba(16, 24, 40, 0.04)',
    ...Array(16).fill('none'), // Fill the rest with default values to match MUI's 25 shadows
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        'html, body, #root': {
          height: '100%',
        },
        body: {
          lineHeight: 1.5,
          overflowX: 'hidden',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 18px',
          boxShadow: 'none',
          fontSize: '0.9375rem',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.18)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${primaryMain} 0%, ${alpha(primaryMain, 0.85)} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${primaryMain} 0%, ${primaryMain} 100%)`,
          },
        },
        containedSecondary: {
          background: `linear-gradient(135deg, ${secondaryMain} 0%, ${alpha(secondaryMain, 0.85)} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${secondaryMain} 0%, ${secondaryMain} 100%)`,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        text: {
          padding: '10px 16px',
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.8125rem',
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 20px rgba(16, 24, 40, 0.08)',
          overflow: 'visible',
          transition: 'box-shadow 0.3s, transform 0.3s',
          '&:hover': {
            boxShadow: '0px 8px 30px rgba(16, 24, 40, 0.12)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 8px rgba(16, 24, 40, 0.06)',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          boxShadow: '4px 0px 16px rgba(16, 24, 40, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(16, 24, 40, 0.1)',
            },
          },
          '& .MuiInputLabel-outlined.Mui-focused': {
            fontWeight: 500,
          },
          '& .MuiOutlinedInput-input': {
            padding: '14px 16px',
          },
          '& .MuiInputAdornment-root': {
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem',
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '0.9375rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 4px 20px rgba(16, 24, 40, 0.08)',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(16, 24, 40, 0.06)',
          padding: '16px 24px',
        },
        head: {
          backgroundColor: '#F9FAFB',
          fontWeight: 600,
          fontSize: '0.875rem',
          color: '#374151',
        },
        body: {
          fontSize: '0.9375rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(16, 24, 40, 0.02)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          height: 32,
          fontWeight: 500,
          '&.MuiChip-colorPrimary': {
            backgroundColor: alpha(primaryMain, 0.1),
            color: primaryMain,
          },
          '&.MuiChip-colorSecondary': {
            backgroundColor: alpha(secondaryMain, 0.1),
            color: secondaryMain,
          },
          '&.MuiChip-colorSuccess': {
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: '#047857',
          },
          '&.MuiChip-colorWarning': {
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#B45309',
          },
          '&.MuiChip-colorError': {
            backgroundColor: 'rgba(244, 63, 94, 0.1)',
            color: '#BE123C',
          },
        },
        label: {
          padding: '0 12px',
          fontSize: '0.8125rem',
        },
        icon: {
          color: 'inherit',
        },
        deleteIcon: {
          color: 'inherit',
          '&:hover': {
            color: 'inherit',
            opacity: 0.7,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeSmall: {
          fontSize: '1rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.9375rem',
          textTransform: 'none',
          padding: '12px 16px',
          minWidth: 'auto',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(16, 24, 40, 0.06)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
          borderRadius: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: '10px 16px',
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: alpha(primaryMain, 0.08),
            color: primaryMain,
            '&:hover': {
              backgroundColor: alpha(primaryMain, 0.12),
            },
            '& .MuiListItemIcon-root': {
              color: primaryMain,
            },
          },
          '&:hover': {
            backgroundColor: 'rgba(16, 24, 40, 0.04)',
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          borderRadius: 12,
          boxShadow: '0px 8px 30px rgba(16, 24, 40, 0.12)',
        },
        list: {
          padding: '8px',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '10px 12px',
          borderRadius: 6,
          fontSize: '0.9375rem',
          minHeight: 42,
          '&:hover': {
            backgroundColor: 'rgba(16, 24, 40, 0.04)',
          },
          '&.Mui-selected': {
            backgroundColor: alpha(primaryMain, 0.08),
            '&:hover': {
              backgroundColor: alpha(primaryMain, 0.12),
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
            '&:first-of-type': {
              marginTop: 0,
            },
          },
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: '0 24px',
          minHeight: 64,
          '&.Mui-expanded': {
            minHeight: 64,
          },
        },
        content: {
          margin: '16px 0',
          '&.Mui-expanded': {
            margin: '16px 0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 24px 24px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          boxShadow: '0px 20px 40px rgba(16, 24, 40, 0.16)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '24px 24px 16px',
          fontSize: '1.25rem',
          fontWeight: 600,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
          '&:first-of-type': {
            paddingTop: 0,
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px 24px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 16px',
        },
        standardSuccess: {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          color: '#047857',
        },
        standardError: {
          backgroundColor: 'rgba(244, 63, 94, 0.1)',
          color: '#BE123C',
        },
        standardWarning: {
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          color: '#B45309',
        },
        standardInfo: {
          backgroundColor: 'rgba(14, 165, 233, 0.1)',
          color: '#0369A1',
        },
        message: {
          padding: '4px 0',
        },
        icon: {
          opacity: 1,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1F2937',
          color: '#ffffff',
          padding: '8px 12px',
          fontSize: '0.8125rem',
          fontWeight: 500,
          borderRadius: 8,
        },
        arrow: {
          color: '#1F2937',
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          borderRadius: 12,
          '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        },
        columnHeader: {
          padding: '0 16px',
          height: 56,
          backgroundColor: '#F9FAFB',
        },
        columnHeaderTitle: {
          fontWeight: 600,
        },
        cell: {
          padding: '0 16px',
          borderBottom: '1px solid rgba(16, 24, 40, 0.06)',
        },
        row: {
          '&:hover': {
            backgroundColor: 'rgba(16, 24, 40, 0.02)',
          },
          '&.Mui-selected': {
            backgroundColor: alpha(primaryMain, 0.08),
            '&:hover': {
              backgroundColor: alpha(primaryMain, 0.12),
            },
          },
        },
      },
    },
  },
});

export default theme;