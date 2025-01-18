const RECOMMENDATIONS_API_URL = import.meta.env.SPRING_RECOMMENDATIONS_API_URL || 'http://localhost:8080/recommendations';

export const getPredictions = async (studentData) => {
  try {
    const response = await fetch(`${RECOMMENDATIONS_API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        educationLevel: studentData.educationLevel,
        olResults: studentData.olResults || {},
        alStream: studentData.alStream || null,
        alResults: studentData.alResults || null,
        gpa: studentData.gpa || null,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch predictions');
    }

    return await response.json();
  } catch (error) {
    console.error('Prediction service error:', error);
    throw error;
  }
};

export const saveProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${RECOMMENDATIONS_API_URL}/profiles/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Profile save error:', error);
    throw error;
  }
};