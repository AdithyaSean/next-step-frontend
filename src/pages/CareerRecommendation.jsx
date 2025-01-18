// src/pages/CareerRecommendation.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPredictions } from '../services/predictionService';
import { Box, Typography, CircularProgress, Paper, List, ListItem, ListItemText } from '@mui/material';

const CareerRecommendation = () => {
  const { currentUser, userProfile } = useAuth();
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else {
      fetchCareerPredictions();
    }
  }, [currentUser, navigate]);

  const fetchCareerPredictions = async () => {
    try {
      const studentData = {
        educationLevel: userProfile.educationLevel,
        olResults: userProfile.olResults,
        alStream: userProfile.alStream,
        alResults: userProfile.alResults,
        gpa: userProfile.gpa,
      };
      const predictions = await getPredictions(studentData);
      setPredictions(predictions);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Career Recommendations
      </Typography>
      <Typography variant="body1" gutterBottom>
        Based on your educational profile, here are your career probabilities:
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        <List>
          {Object.entries(predictions).map(([career, probability]) => (
            <ListItem key={career}>
              <ListItemText
                primary={career}
                secondary={`${probability.toFixed(2)}%`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default CareerRecommendation;