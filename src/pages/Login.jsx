import { Container, Box, Button, Typography, Paper, TextField, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [name, setName] = useState('');
  const [role, setRole] = useState('STUDENT');
  const navigate = useNavigate();
  const { login, createUser } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      if (user) {
    navigate('/profile');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleCreateAccount = async () => {
    try {
      const userData = {
        name,
        email,
        password,
        role,
      };
      const user = await createUser(userData);
      if (user) {
        navigate('/profile');
      }
    } catch (error) {
      setError('Failed to create account');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
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
          <Tabs value={tabValue} onChange={handleTabChange} centered>
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>
          {tabValue === 0 ? (
            <>
              <Typography component="h1" variant="h5" gutterBottom>
                Sign in to Next Step
          </Typography>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Get personalized educational and career recommendations
            </Typography>
              <TextField
                label="Email"
                type="email"
            fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleLogin}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Sign in
              </Button>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5" gutterBottom>
                Create Account
              </Typography>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                label="Role"
                select
                fullWidth
                margin="normal"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="STUDENT">Student</option>
                <option value="INSTITUTION">Institution</option>
              </TextField>
              {error && (
                <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Button
                variant="contained"
                onClick={handleCreateAccount}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                Create Account
              </Button>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}