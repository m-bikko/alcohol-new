import React, { useState } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import LogoutIcon from '@mui/icons-material/Logout';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Tooltip from '@mui/material/Tooltip';
import HealingIcon from '@mui/icons-material/Healing';
import ChatIcon from '@mui/icons-material/Chat';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const drawerWidth = 280;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 12,
  backgroundColor: alpha('#fff', 0.15),
  '&:hover': {
    backgroundColor: alpha('#fff', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  transition: 'all 0.2s ease-in-out',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.25, 1, 1.25, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.standard,
  }),
  marginLeft: `-${drawerWidth}px`,
  width: `calc(100% + ${drawerWidth}px)`,
  ...(open && {
    marginLeft: 0,
    width: '100%',
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const BrandLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 12,
  padding: theme.spacing(2, 1),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  boxShadow: '0px 4px 12px rgba(37, 99, 235, 0.15)',
}));

// Menu group divider with label
const MenuGroupLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: theme.palette.text.secondary,
  letterSpacing: '0.05em',
  padding: theme.spacing(2, 2, 1),
}));

interface DashboardLayoutProps {
  children: React.ReactNode;
}

// Modernized menu groups
const menuGroups = [
  {
    label: 'Основное',
    items: [
      { text: 'Аналитика', icon: <DashboardIcon />, path: '/dashboard' },
      { text: 'Сотрудники', icon: <PeopleIcon />, path: '/employees' },
      { text: 'Алкотестирование', icon: <HealingIcon />, path: '/testing' },
    ],
  },
  {
    label: 'Документы',
    items: [
      { text: 'Журнал тестов', icon: <AssignmentIcon />, path: '/journal/alcohol-tests', badge: '42' },
      { text: 'Положительные тесты', icon: <LocalHospitalIcon />, path: '/journal/positive-tests', badge: '5', badgeColor: 'error' },
      { text: 'Направления', icon: <MedicalInformationIcon />, path: '/referrals' },
      { text: 'Акты отказа', icon: <ChatIcon />, path: '/refusal-acts' },
    ],
  },
  {
    label: 'Система',
    items: [
      { text: 'Настройки', icon: <SettingsIcon />, path: '/settings' },
    ],
  },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [departmentAnchorEl, setDepartmentAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleDepartmentMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDepartmentAnchorEl(event.currentTarget);
  };

  const handleDepartmentMenuClose = () => {
    setDepartmentAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

  const handleProfileOpen = () => {
    handleProfileMenuClose();
    navigate('/profile');
  };

  const getCurrentPageTitle = () => {
    let title = 'Система алкотестирования';
    menuGroups.forEach(group => {
      const item = group.items.find(item => item.path === location.pathname);
      if (item) {
        title = item.text;
      }
    });
    return title;
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: theme.palette.background.default,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
          color: theme.palette.text.primary,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
          }),
        }}
        elevation={0}
      >
        <Toolbar sx={{ padding: '0 16px', minHeight: 70 }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 2,
              color: theme.palette.primary.main,
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              color: theme.palette.text.primary,
              fontWeight: 600,
              letterSpacing: '-0.01em'
            }}
          >
            {getCurrentPageTitle()}
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: theme.palette.primary.light }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Поиск..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDepartmentMenuOpen}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              borderRadius: 10,
              mr: 2,
              px: 2,
              borderWidth: 1,
              fontWeight: 500,
              '&:hover': {
                borderWidth: 1,
                backgroundColor: alpha(theme.palette.primary.main, 0.04)
              }
            }}
          >
            {user?.department || 'Выбрать отдел'}
          </Button>
          
          <Menu
            anchorEl={departmentAnchorEl}
            open={Boolean(departmentAnchorEl)}
            onClose={handleDepartmentMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleDepartmentMenuClose}>Отдел 1</MenuItem>
            <MenuItem onClick={handleDepartmentMenuClose}>Отдел 2</MenuItem>
            <MenuItem onClick={handleDepartmentMenuClose}>Отдел 3</MenuItem>
            <Divider />
            <MenuItem onClick={() => { handleDepartmentMenuClose(); navigate('/department-select'); }}>
              Управление отделами
            </MenuItem>
          </Menu>
          
          <Tooltip title="Помощь">
            <IconButton 
              color="inherit" 
              sx={{ 
                mr: 1,
                color: theme.palette.text.secondary
              }}
            >
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Уведомления">
            <IconButton 
              color="inherit" 
              onClick={handleNotificationMenuOpen}
              sx={{ 
                mr: 2,
                color: theme.palette.text.secondary
              }}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              elevation: 3,
              sx: {
                minWidth: 320,
                borderRadius: 3,
                overflow: 'visible',
                mt: 1.5,
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
              <Typography variant="subtitle1" fontWeight={600}>Уведомления</Typography>
            </Box>
            
            <MenuItem onClick={handleNotificationMenuClose} sx={{ py: 2, px: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Chip 
                    label="Новый" 
                    size="small" 
                    color="primary" 
                    sx={{ 
                      height: 20, 
                      fontSize: '0.625rem', 
                      mr: 1,
                      fontWeight: 'bold'
                    }} 
                  />
                  <Typography variant="caption" color="text.secondary">
                    10 мин. назад
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Необходимо повторное тестирование сотрудника
                </Typography>
              </Box>
            </MenuItem>
            
            <MenuItem onClick={handleNotificationMenuClose} sx={{ py: 2, px: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    2 часа назад
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Загружен новый список сотрудников
                </Typography>
              </Box>
            </MenuItem>
            
            <MenuItem onClick={handleNotificationMenuClose} sx={{ py: 2, px: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Вчера, 15:42
                  </Typography>
                </Box>
                <Typography variant="body2">
                  Обновление системы завершено успешно
                </Typography>
              </Box>
            </MenuItem>
            
            <Box sx={{ p: 1, borderTop: `1px solid ${theme.palette.divider}`, textAlign: 'center' }}>
              <Button 
                size="small" 
                onClick={handleNotificationMenuClose}
                sx={{ 
                  width: '100%',
                  fontSize: '0.75rem',
                  py: 1
                }}
              >
                Показать все уведомления
              </Button>
            </Box>
          </Menu>
          
          <Divider orientation="vertical" flexItem sx={{ mr: 2, opacity: 0.1 }} />
          
          <Box>
            <Button
              onClick={handleProfileMenuOpen}
              sx={{
                borderRadius: 10,
                textTransform: 'none',
                px: 1.5,
              }}
              endIcon={<KeyboardArrowDownIcon />}
              color="inherit"
              startIcon={
                <Avatar
                  alt={user?.name || 'Медработник'}
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    bgcolor: theme.palette.primary.main,
                    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
                  }}
                >
                  {user?.name ? user.name.charAt(0) : 'М'}
                </Avatar>
              }
            >
              <Box sx={{ textAlign: 'left', ml: 0.5 }}>
                <Typography 
                  variant="body2" 
                  lineHeight={1.2} 
                  fontWeight={600}
                  sx={{ display: 'block' }}
                >
                  {user?.name || 'Медицинский работник'}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary" 
                  lineHeight={1.2}
                  sx={{ display: 'block' }}
                >
                  Специалист
                </Typography>
              </Box>
            </Button>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  minWidth: 220,
                  borderRadius: 3,
                  overflow: 'visible',
                  mt: 1.5,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, pt: 2, pb: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {user?.name || 'Медицинский работник'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email || 'example@example.com'}
                </Typography>
              </Box>
              <Divider />
              <MenuItem onClick={handleProfileOpen} sx={{ py: 1.5 }}>
                Мой профиль
              </MenuItem>
              <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/settings') }} sx={{ py: 1.5 }}>
                Настройки
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: theme.palette.error.main }}>
                <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                Выйти
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            background: theme.palette.background.default,
            boxShadow: '4px 0 24px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden',
          },
        }}
      >
        <DrawerHeader sx={{ p: 0, minHeight: 70 }}>
          <BrandLogo>
            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center' }}>
              <HealthAndSafetyIcon sx={{ fontSize: 28, color: 'white', mr: 1.5 }} />
              <Typography variant="h6" color="white" sx={{ fontWeight: 700, letterSpacing: '0.01em' }}>
                МедКонтроль
              </Typography>
            </Box>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </BrandLogo>
        </DrawerHeader>
        
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            borderRadius: 10,
          },
          px: 2
        }}>
          {menuGroups.map((group, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <MenuGroupLabel>{group.label}</MenuGroupLabel>
              <List disablePadding>
                {group.items.map((item) => (
                  <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                    <ListItemButton
                      selected={location.pathname === item.path}
                      onClick={() => navigate(item.path)}
                      sx={{
                        borderRadius: 3,
                        px: 2,
                        py: 1.25,
                        fontSize: '0.9375rem',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease-in-out',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 4,
                          height: 20,
                          borderRadius: '0 4px 4px 0',
                          backgroundColor: theme.palette.primary.main,
                          opacity: location.pathname === item.path ? 1 : 0,
                          transition: 'opacity 0.2s ease-in-out',
                        },
                        '&.Mui-selected': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.12),
                          },
                          '& .MuiListItemIcon-root': {
                            color: theme.palette.primary.main,
                          },
                        },
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 40,
                          color: location.pathname === item.path 
                            ? theme.palette.primary.main 
                            : theme.palette.text.secondary,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                          fontWeight: location.pathname === item.path ? 600 : 500,
                          fontSize: '0.9375rem',
                        }}
                      />
                      {item.badge && (
                        <Chip
                          label={item.badge}
                          size="small"
                          color={item.badgeColor as "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined || "primary"}
                          sx={{
                            height: 20,
                            minWidth: 20,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
        
        <Box sx={{ mt: 'auto', p: 3, textAlign: 'center' }}>
          <Box sx={{ 
            p: 2, 
            borderRadius: 3, 
            backgroundColor: alpha(theme.palette.primary.main, 0.04),
            mb: 2
          }}>
            <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
              Служба поддержки
            </Typography>
            <Typography variant="body2" fontWeight={500} color={theme.palette.primary.main}>
              +7 (800) 000-00-00
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block">
            © 2025 МедКонтроль, v2.0
          </Typography>
        </Box>
      </Drawer>
      
      <Main open={open} sx={{ 
        pt: '70px', 
        overflow: 'auto',
        backgroundColor: theme.palette.background.subtle,
        backgroundImage: 'linear-gradient(to bottom, rgba(243, 244, 246, 0) 0%, rgba(243, 244, 246, 0.5) 100%)',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.standard,
        }),
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        pb: 6
      }}>
        {children}
      </Main>
    </Box>
  );
};

export default DashboardLayout;