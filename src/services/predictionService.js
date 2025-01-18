const USERS_API_URL = import.meta.env.SPRING_USERS_API_URL || 'http://localhost:8082';

/**
 * Get career predictions for a student profile
 * @param {Object} profileData - Student profile data
 * @param {number} profileData.educationLevel - Education level (0: OL, 1: AL, 2: UNI)
 * @param {Object} profileData.olResults - Object of O/L results with subject codes and grades
 * @param {number} profileData.alStream - A/L stream code
 * @param {Object} profileData.alResults - Object of A/L results with subject codes and grades
 * @param {number} profileData.gpa - University GPA (optional)
 * @returns {Promise<Object>} Object of career predictions with probabilities
 */
export const getPredictions = async (profileData) => {
  try {
    const response = await fetch(`${USERS_API_URL}/recommendations/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get predictions');
    }

    return await response.json();
  } catch (error) {
    console.error('Prediction service error:', error);
    throw error;
  }
};

/**
 * Save student profile data
 * @param {string} userId - Firebase user ID
 * @param {Object} profileData - Complete profile data including predictions
 */
export const saveProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${USERS_API_URL}/profiles/${userId}`, {
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