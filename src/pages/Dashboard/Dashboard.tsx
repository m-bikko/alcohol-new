import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  Stack,
  Avatar,
  Chip,
  IconButton,
  alpha,
  useTheme,
  ButtonGroup,
  LinearProgress,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import MedicalInformationOutlinedIcon from '@mui/icons-material/MedicalInformationOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassTopOutlinedIcon from '@mui/icons-material/HourglassTopOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend
);

// Custom styled components for modern UI
const StatsCard = styled(Card)(({ theme }) => ({
  borderRadius: 20,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.25s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: 16,
  flexShrink: 0,
}));

const GradientBackground = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  opacity: 0.08,
  zIndex: 0,
  borderRadius: 'inherit',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: '12px 24px',
  fontWeight: 600,
  transition: 'all 0.25s ease',
  boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.15)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
}));

// Task component for a cleaner code structure
const TaskItem = ({ icon, color, title, description, priority }: {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  priority?: 'high' | 'medium' | 'low';
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        p: 2,
        borderRadius: 3,
        mb: 1.5,
        backgroundColor: alpha(color, 0.05),
        border: `1px solid ${alpha(color, 0.08)}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {priority && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 4,
            height: '100%',
            backgroundColor: priority === 'high' ? theme.palette.error.main : 
                            priority === 'medium' ? theme.palette.warning.main : 
                            theme.palette.success.main,
          }}
        />
      )}
      
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 2,
          backgroundColor: alpha(color, 0.1),
          color: color,
          mr: 2,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      
      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {title}
          </Typography>
          
          <IconButton size="small" sx={{ mr: -1 }}>
            <MoreHorizIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
          </IconButton>
        </Box>
        
        <Typography variant="caption" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [chartView, setChartView] = React.useState<'week' | 'month' | 'quarter'>('week');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Weekly test data with improved styling
  const weeklyTestData = {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    datasets: [
      {
        label: 'Отрицательные тесты',
        data: [45, 42, 47, 38, 41, 20, 8],
        backgroundColor: alpha(theme.palette.success.main, 0.7),
        borderColor: theme.palette.success.main,
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 12,
        maxBarThickness: 18,
      },
      {
        label: 'Положительные тесты',
        data: [2, 1, 3, 1, 2, 0, 0],
        backgroundColor: alpha(theme.palette.error.main, 0.7),
        borderColor: theme.palette.error.main,
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 12,
        maxBarThickness: 18,
      },
    ],
  };

  // Chart options with improved styling
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            family: theme.typography.fontFamily,
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: theme.palette.background.paper,
        titleColor: theme.palette.text.primary,
        bodyColor: theme.palette.text.secondary,
        borderColor: theme.palette.divider,
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: theme.typography.fontFamily,
        },
        titleFont: {
          family: theme.typography.fontFamily,
          weight: 'bold',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          font: {
            family: theme.typography.fontFamily,
            size: 11,
          },
          color: theme.palette.text.secondary,
        },
        grid: {
          color: alpha(theme.palette.divider, 0.5),
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          font: {
            family: theme.typography.fontFamily,
            size: 11,
          },
          color: theme.palette.text.secondary,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };

  // Department test data with improved styling
  const departmentTestData = {
    labels: ['Цех №1', 'Цех №2', 'Цех №3', 'Администрация', 'Финансы', 'Охрана'],
    datasets: [
      {
        label: 'Всего тестов',
        data: [120, 105, 98, 65, 45, 30],
        backgroundColor: alpha(theme.palette.primary.main, 0.7),
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 18,
        maxBarThickness: 24,
      },
      {
        label: 'Положительные тесты',
        data: [3, 2, 4, 0, 0, 1],
        backgroundColor: alpha(theme.palette.error.main, 0.7),
        borderColor: theme.palette.error.main,
        borderWidth: 2,
        borderRadius: 6,
        barThickness: 18,
        maxBarThickness: 24,
      },
    ],
  };

  return (
    <Box>
      {/* Dashboard Header */}
      <Box 
        sx={{ 
          mb: 4, 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2
        }}
      >
        <Box>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              mb: 1,
              letterSpacing: '-0.01em'
            }}
          >
            Аналитика
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Обзор системы алкотестирования и ключевые метрики
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            color="primary"
            startIcon={<CalendarMonthOutlinedIcon />}
            sx={{ 
              borderRadius: 3, 
              borderWidth: 2,
              '&:hover': { borderWidth: 2 },
              px: 2.5
            }}
          >
            Апрель 2025
          </Button>
          
          <ActionButton
            variant="contained"
            color="primary"
            onClick={() => navigate('/testing')}
            startIcon={<PlayArrowIcon />}
          >
            Начать тестирование
          </ActionButton>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard elevation={1}>
            <GradientBackground 
              sx={{ 
                background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)` 
              }} 
            />
            <CardContent sx={{ position: 'relative', zIndex: 1, height: '100%', p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <IconBox sx={{ backgroundColor: alpha('#fff', 0.2), color: '#fff' }}>
                  <PeopleOutlinedIcon sx={{ fontSize: 28 }} />
                </IconBox>
                
                <Box sx={{ display: 'flex', alignItems: 'center', color: alpha('#fff', 0.9) }}>
                  <ArrowUpwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600}>
                    +2.3%
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5, color: '#fff' }}>
                254
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: alpha('#fff', 0.9) }}>
                  Сотрудников всего
                </Typography>
                
                <Chip 
                  size="small" 
                  label="Просмотр" 
                  sx={{ 
                    backgroundColor: alpha('#fff', 0.2), 
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 24,
                    '& .MuiChip-label': { px: 1 }
                  }}
                  onClick={() => navigate('/employees')}
                />
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <IconBox 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.success.main, 0.1), 
                    color: theme.palette.success.main 
                  }}
                >
                  <CheckCircleOutlineIcon sx={{ fontSize: 28 }} />
                </IconBox>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: theme.palette.success.main,
                  backgroundColor: alpha(theme.palette.success.main, 0.1),
                  borderRadius: 5,
                  px: 1,
                  py: 0.5
                }}>
                  <ArrowUpwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600}>
                    +14%
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                42
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
                  Протестировано сегодня
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}
                >
                  20 апреля
                </Typography>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <IconBox 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.warning.main, 0.1), 
                    color: theme.palette.warning.main 
                  }}
                >
                  <HourglassTopOutlinedIcon sx={{ fontSize: 28 }} />
                </IconBox>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: theme.palette.warning.main,
                  backgroundColor: alpha(theme.palette.warning.main, 0.1),
                  borderRadius: 5,
                  px: 1,
                  py: 0.5
                }}>
                  <Typography variant="caption" fontWeight={600}>
                    В ожидании
                  </Typography>
                </Box>
              </Box>
              
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                3
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
                  Ожидают повторный тест
                </Typography>
                
                <Button 
                  size="small" 
                  sx={{ 
                    fontSize: '0.75rem', 
                    p: 0, 
                    minWidth: 'auto',
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                  endIcon={<NavigateNextIcon sx={{ fontSize: 18 }} />}
                >
                  Перейти
                </Button>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <StatsCard>
            <CardContent sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <IconBox 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.error.main, 0.1), 
                    color: theme.palette.error.main 
                  }}
                >
                  <WarningAmberOutlinedIcon sx={{ fontSize: 28 }} />
                </IconBox>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: theme.palette.error.main,
                  backgroundColor: alpha(theme.palette.error.main, 0.1),
                  borderRadius: 5,
                  px: 1,
                  py: 0.5
                }}>
                  <ArrowDownwardIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight={600}>
                    -30%
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                  2
                </Typography>
                
                <IconButton 
                  size="small"
                  sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), mr: -1 }}
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
                </IconButton>
                
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 1,
                    sx: {
                      minWidth: 200,
                      borderRadius: 2,
                      overflow: 'visible',
                      mt: 1.5,
                      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                      '&::before': {
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
                  <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate('/journal/positive-tests');
                  }}>
                    <ListItemIcon>
                      <AssignmentOutlinedIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText>Показать детали</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                      <MedicalInformationOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Создать направление</ListItemText>
                  </MenuItem>
                </Menu>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
                  Положительных сегодня
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ color: theme.palette.error.main, fontWeight: 600 }}
                >
                  Требуется действие
                </Typography>
              </Box>
            </CardContent>
          </StatsCard>
        </Grid>
      </Grid>

      {/* Main Content Area */}
      <Grid container spacing={3}>
        {/* Chart Section */}
        <Grid item xs={12} lg={8}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
              height: '100%',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backdropFilter: 'blur(20px)',
              background: alpha(theme.palette.background.paper, 0.8),
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Статистика алкотестирования
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Данные о проведенных тестах и их результатах
                </Typography>
              </Box>
              
              <ButtonGroup 
                variant="outlined" 
                aria-label="chart view options"
                sx={{ 
                  '& .MuiButton-root': { 
                    borderColor: alpha(theme.palette.divider, 0.3),
                    color: theme.palette.text.secondary,
                    px: 2,
                    '&.active': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      borderColor: theme.palette.primary.main,
                    }
                  } 
                }}
              >
                <Button 
                  className={chartView === 'week' ? 'active' : ''}
                  onClick={() => setChartView('week')}
                >
                  Неделя
                </Button>
                <Button 
                  className={chartView === 'month' ? 'active' : ''}
                  onClick={() => setChartView('month')}
                >
                  Месяц
                </Button>
                <Button 
                  className={chartView === 'quarter' ? 'active' : ''}
                  onClick={() => setChartView('quarter')}
                >
                  Квартал
                </Button>
              </ButtonGroup>
            </Box>
            
            <Box sx={{ height: 320 }}>
              <Bar data={weeklyTestData} options={chartOptions} />
            </Box>
            
            <Divider sx={{ my: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Эффективность по подразделениям
              </Typography>
              
              <Button
                endIcon={<KeyboardArrowDownIcon />}
                variant="text"
                sx={{ color: theme.palette.text.secondary }}
              >
                Все подразделения
              </Button>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Цех №1
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      97.5%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={97.5} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.success.main,
                      }
                    }} 
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Цех №2
                    </Typography>
                    <Typography variant="body2" fontWeight={600}>
                      98.1%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={98.1} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.success.main,
                      }
                    }} 
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      Цех №3
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="error.main">
                      95.8%
                    </Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={95.8} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: theme.palette.error.main,
                      }
                    }} 
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Upcoming Tasks/Schedule Section */}
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
              height: '100%',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backdropFilter: 'blur(20px)',
              background: alpha(theme.palette.background.paper, 0.8),
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3 
            }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Запланированные задачи
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Задачи на сегодня, {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                </Typography>
              </Box>
              
              <Tooltip title="Добавить новую задачу">
                <IconButton 
                  size="small" 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
            
            <Box>
              <TaskItem 
                icon={<MedicalInformationOutlinedIcon />}
                color={theme.palette.error.main}
                title="Повторное тестирование"
                description="Сидоров А.П., Цех №2, 09:30"
                priority="high"
              />
              
              <TaskItem 
                icon={<AssignmentOutlinedIcon />}
                color={theme.palette.primary.main}
                title="Оформление направления"
                description="Петров В.С., Цех №1, 10:15"
                priority="medium"
              />
              
              <TaskItem 
                icon={<EventAvailableOutlinedIcon />}
                color={theme.palette.success.main}
                title="Тестирование новой смены"
                description="Цех №3, 12:00"
                priority="low"
              />
              
              <TaskItem 
                icon={<ModeEditOutlineOutlinedIcon />}
                color={theme.palette.text.secondary}
                title="Завершение отчета"
                description="Подготовка месячного отчета, 14:30"
              />
            </Box>
            
            <Divider sx={{ my: 3, borderColor: alpha(theme.palette.divider, 0.1) }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mr: 1 }}>
                Недавняя активность
              </Typography>
              <Chip 
                label="Новые" 
                color="primary" 
                size="small" 
                sx={{ 
                  height: 20, 
                  fontSize: '0.625rem', 
                  fontWeight: 'bold' 
                }} 
              />
            </Box>
            
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    mr: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main
                  }}
                >
                  <TrendingUpOutlinedIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Отчет по тестированию обновлен
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    15 минут назад
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    mr: 2,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    color: theme.palette.success.main
                  }}
                >
                  <CheckCircleOutlineIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    27 сотрудников успешно протестированы
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    2 часа назад
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36, 
                    mr: 2, 
                    backgroundColor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main 
                  }}
                >
                  <WarningAmberOutlinedIcon fontSize="small" />
                </Avatar>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Обнаружен положительный результат
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Сегодня, 08:45
                  </Typography>
                </Box>
              </Box>
            </Stack>
            
            <Button
              variant="outlined"
              fullWidth
              color="primary"
              startIcon={<CalendarMonthOutlinedIcon />}
              onClick={() => navigate('/calendar')}
              sx={{ 
                mt: 3, 
                borderRadius: 3, 
                py: 1.25,
                borderWidth: 1.5,
                '&:hover': {
                  borderWidth: 1.5,
                  bgcolor: alpha(theme.palette.primary.main, 0.05)
                }
              }}
            >
              Открыть расписание
            </Button>
          </Paper>
        </Grid>
        
        {/* Department Stats Section */}
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              backdropFilter: 'blur(20px)',
              background: alpha(theme.palette.background.paper, 0.8),
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3,
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  Тестирование по подразделениям
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Распределение тестов и результатов по отделам за апрель 2025
                </Typography>
              </Box>
              
              <Button
                variant="outlined"
                color="primary"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{ 
                  borderRadius: 3,
                  borderWidth: 1.5,
                  '&:hover': {
                    borderWidth: 1.5
                  }
                }}
              >
                Экспорт данных
              </Button>
            </Box>
            
            <Box sx={{ height: 350 }}>
              <Bar data={departmentTestData} options={chartOptions} />
            </Box>
            
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: 3, 
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: theme.palette.primary.main
                    }}
                  >
                    <AssignmentOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      463
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Всего тестов в апреле
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.success.main, 0.05),
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: 3, 
                      backgroundColor: alpha(theme.palette.success.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: theme.palette.success.main
                    }}
                  >
                    <CheckCircleOutlineIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      97.8%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Тестов с отрицательным результатом
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    borderRadius: 3,
                    backgroundColor: alpha(theme.palette.error.main, 0.05),
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 48, 
                      height: 48, 
                      borderRadius: 3, 
                      backgroundColor: alpha(theme.palette.error.main, 0.1),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      color: theme.palette.error.main
                    }}
                  >
                    <WarningAmberOutlinedIcon />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      10
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Положительных тестов за месяц
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;