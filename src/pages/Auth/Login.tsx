import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Divider,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Fade,
  useTheme,
  alpha,
  Link,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Phone,
  Login as LoginIcon,
  SecurityOutlined,
  HealthAndSafetyOutlined,
  BarChartOutlined,
  CheckCircleOutlineOutlined,
  AssignmentOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Modern login shapes
const LoginShape = ({ color, size, top, left, right, bottom, opacity = 0.1, blur = 70 }: {
  color: string;
  size: number;
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  opacity?: number;
  blur?: number;
}) => (
  <Box
    sx={{
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      opacity: opacity,
      filter: `blur(${blur}px)`,
      top,
      left,
      right,
      bottom,
      zIndex: 0
    }}
  />
);

// Feature card component for a cleaner layout
const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        mb: 4,
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 46,
          height: 46,
          borderRadius: 2.5,
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          color: theme.palette.primary.main,
          mr: 2,
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

const Login: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const theme = useTheme();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clean non-numeric characters
    const cleanedValue = e.target.value.replace(/[^0-9]/g, '');
    
    // Format phone number
    let formattedValue = '';
    if (cleanedValue.length > 0) {
      formattedValue = '+' + cleanedValue;
      if (cleanedValue.length > 1) {
        formattedValue = formattedValue.substring(0, 2) + ' ' + formattedValue.substring(2);
      }
      if (cleanedValue.length > 4) {
        formattedValue = formattedValue.substring(0, 6) + ' ' + formattedValue.substring(6);
      }
      if (cleanedValue.length > 7) {
        formattedValue = formattedValue.substring(0, 10) + ' ' + formattedValue.substring(10);
      }
      if (cleanedValue.length > 9) {
        formattedValue = formattedValue.substring(0, 13) + ' ' + formattedValue.substring(13);
      }
    }
    
    setPhoneNumber(formattedValue);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check phone number length
    const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    if (cleanedPhoneNumber.length < 10) {
      setError('Пожалуйста, введите корректный номер телефона');
      return;
    }

    if (!password) {
      setError('Пожалуйста, введите пароль');
      return;
    }

    try {
      setLoading(true);
      await login(phoneNumber, password);
      setLoading(false);
      navigate('/department-select');
    } catch (error) {
      setLoading(false);
      setError('Неверный номер телефона или пароль');
    }
  };

  return (
    <Container 
      maxWidth={false} 
      disableGutters 
      sx={{ 
        height: '100vh', 
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      {/* Left panel (features) */}
      <Box
        sx={{
          flex: { xs: 0, md: 1, lg: 1.2 },
          display: { xs: 'none', md: 'flex' },
          position: 'relative',
          color: 'white',
          p: { md: 4, lg: 8 },
          flexDirection: 'column',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <LoginShape color={theme.palette.primary.light} size={600} top="-10%" right="-20%" opacity={0.08} blur={100} />
        <LoginShape color="#ffffff" size={300} bottom="-5%" left="-10%" opacity={0.1} blur={70} />
        <LoginShape color={theme.palette.secondary.main} size={200} top="20%" right="10%" opacity={0.07} blur={60} />
        
        <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 560 }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box 
                  sx={{ 
                    p: 1.5,
                    borderRadius: 2.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    mr: 2,
                  }}
                >
                  <HealthAndSafetyOutlined sx={{ fontSize: 36, color: 'white' }} />
                </Box>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                  МедКонтроль
                </Typography>
              </Box>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  letterSpacing: '-0.02em',
                  fontSize: { md: '2.2rem', lg: '2.75rem' },
                  lineHeight: 1.2,
                  maxWidth: 520,
                }}
              >
                Система учёта алкотестирования работников
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 6, 
                  fontWeight: 400, 
                  opacity: 0.9,
                  maxWidth: 520,
                  lineHeight: 1.5,
                }}
              >
                Современная цифровая платформа для эффективного контроля и мониторинга состояния сотрудников на предприятии
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <FeatureCard
                  icon={<CheckCircleOutlineOutlined sx={{ fontSize: 24 }} />}
                  title="Эффективное тестирование"
                  description="Быстрое проведение проверок с автоматической регистрацией результатов"
                />
                
                <FeatureCard
                  icon={<BarChartOutlined sx={{ fontSize: 24 }} />}
                  title="Расширенная аналитика"
                  description="Детальные отчеты и статистика для повышения безопасности на производстве"
                />
                
                <FeatureCard
                  icon={<AssignmentOutlined sx={{ fontSize: 24 }} />}
                  title="Автоматизация документов"
                  description="Мгновенное создание всех необходимых форм, актов и направлений"
                />
              </Box>
              
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 2.5,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <SecurityOutlined sx={{ fontSize: 24, mr: 2, color: 'rgba(255, 255, 255, 0.7)' }} />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Система соответствует всем требованиям безопасности и защиты персональных данных согласно законодательству РФ
                </Typography>
              </Box>
            </Box>
          </Fade>
        </Box>
        
        {/* Bottom logo footer */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            p: 3, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            © 2025 МедКонтроль — Все права защищены
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            Версия 2.0
          </Typography>
        </Box>
      </Box>

      {/* Right panel (login form) */}
      <Box
        sx={{
          flex: { xs: 1, md: 0.8 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 4, md: 6 },
          bgcolor: theme.palette.background.default,
          position: 'relative',
          overflow: 'auto',
        }}
      >
        {/* Decorative shapes for login form */}
        <LoginShape 
          color={alpha(theme.palette.primary.main, 0.2)} 
          size={400} 
          top="5%" 
          right="-15%" 
          opacity={0.05} 
          blur={80} 
        />
        <LoginShape 
          color={alpha(theme.palette.secondary.main, 0.3)} 
          size={350} 
          bottom="-10%" 
          left="-10%" 
          opacity={0.05} 
          blur={70} 
        />
        
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              width: '100%',
              maxWidth: 480,
              p: { xs: 3, sm: 6 },
              borderRadius: 4,
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.07)',
              border: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
              position: 'relative',
              zIndex: 2,
              backgroundColor: alpha(theme.palette.background.paper, 0.8),
              backdropFilter: 'blur(12px)',
            }}
          >
            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Box sx={{ display: { xs: 'flex', md: 'none' }, mb: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    p: 1,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    mr: 1.5,
                  }}
                >
                  <HealthAndSafetyOutlined sx={{ fontSize: 30, color: theme.palette.primary.main }} />
                </Box>
                <Typography variant="h5" component="h1" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                  МедКонтроль
                </Typography>
              </Box>
              
              <Typography 
                variant="h4" 
                component="h2" 
                sx={{ 
                  mb: 1.5, 
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Добро пожаловать
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{ maxWidth: 320, mx: 'auto' }}
              >
                Войдите в систему для доступа к панели управления
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Номер телефона"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={handlePhoneChange}
                margin="normal"
                placeholder="+7 xxx xxx xx xx"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />

              <TextField
                label="Пароль"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handlePasswordToggle} 
                        edge="end"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                  },
                }}
              />

              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      size="small"
                      sx={{
                        color: theme.palette.primary.main,
                        '&.Mui-checked': {
                          color: theme.palette.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Запомнить меня
                    </Typography>
                  }
                />
                <Link 
                  href="#" 
                  underline="hover" 
                  variant="body2"
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                >
                  Забыли пароль?
                </Link>
              </Box>

              {error && (
                <Box
                  sx={{
                    p: 2,
                    mb: 3,
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.error.main, 0.08),
                    color: theme.palette.error.main,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {error}
                  </Typography>
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                size="large"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                }}
                startIcon={loading ? undefined : <LoginIcon />}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Войти в систему'}
              </Button>
            </form>

            <Box sx={{ mt: 4, mb: 2 }}>
              <Divider>
                <Typography variant="body2" color="text.secondary">
                  или
                </Typography>
              </Divider>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 500,
                fontSize: '1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              Войти через E-Gov
            </Button>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Возникли проблемы при входе?{' '}
                <Link 
                  href="#" 
                  underline="hover" 
                  sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                  }}
                >
                  Обратитесь в поддержку
                </Link>
              </Typography>
            </Box>
          </Paper>
        </Fade>
        
        {/* Mobile version footer */}
        <Box 
          sx={{ 
            mt: 3, 
            textAlign: 'center', 
            display: { xs: 'block', md: 'none' }
          }}
        >
          <Typography variant="caption" color="text.secondary">
            © 2025 МедКонтроль — Все права защищены
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;