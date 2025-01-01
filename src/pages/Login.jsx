import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/profile');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5" gutterBottom>
            Sign in to Next Step
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Get personalized educational and career recommendations
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            fullWidth
            size="large"
          >
            Sign in with Google
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
