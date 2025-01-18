import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { currentUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    if (!currentUser) {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error('Error signing in:', error);
      }
    }
    navigate('/profile');
  };

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Educational Pathways',
      description: 'Discover university fields that align with your goals and interests'
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Career Recommendations',
      description: 'Get personalized career path suggestions based on your profile'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Success Probability',
      description: 'View your likelihood of success in different career paths'
    }
  ];

  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center'
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="text.primary"
          gutterBottom
        >
          Next Step
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your AI-powered educational and career pathway advisor
        </Typography>
        {currentUser ? (
          <Typography variant="h6" color="text.primary" sx={{ mt: 4 }}>
            Hello, {currentUser.name}!
              </Typography>
        ) : (
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        )}
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
              elevation={2}
            >
              <Box sx={{ color: 'primary.main', mb: 2 }}>
                {feature.icon}
              </Box>
              <Typography variant="h5" component="h2" gutterBottom>
                {feature.title}
              </Typography>
              <Typography color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
