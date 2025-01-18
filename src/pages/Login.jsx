import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    navigate('/profile');
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
            onClick={handleLogin}
            fullWidth
            size="large"
          >
            Sign in
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}