const USERS_API_URL = import.meta.env.SPRING_USERS_API_URL || 'http://localhost:8080/users';

export const createUser = async (userData) => {
  try {
    console.log('Request:', userData);
    const response = await fetch(`${USERS_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log('Response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('User service error:', error);
    throw error;
  }
};

export const getUser = async (email) => {
  try {
    console.log('Fetching user with email:', email);
    const response = await fetch(`${USERS_API_URL}/email/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response:', response);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user');
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
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update user');
    }

    return await response.json();
  } catch (error) {
    console.error('User service error:', error);
    throw error;
  }
};