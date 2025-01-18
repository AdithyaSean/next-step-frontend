const USERS_API_URL = import.meta.env.SPRING_USERS_API_URL || 'http://localhost:8081/users';

export const createUser = async (userData) => {
  try {
    const response = await fetch(`${USERS_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    return await response.json();
  } catch (error) {
    console.error('User service error:', error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    const response = await fetch(`${USERS_API_URL}/email/${email}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    return await response.json();
  } catch (error) {
    console.error('User service error:', error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${USERS_API_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error('User service error:', error);
    throw error;
  }
};