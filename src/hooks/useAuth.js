import { useState } from 'react';
import { createUser, getUser, updateUser } from '../services/userService';

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    try {
      const user = await getUser(email);
      if (user && user.password === password) {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        return user;
      } else {
        setLoginAttempts(loginAttempts + 1);
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const createAccount = async (userData) => {
    try {
      const user = await createUser(userData);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        return user;
      }
    } catch (error) {
      console.error('Account creation error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    setLoginAttempts(0);
  };

  return { currentUser, login, createAccount, logout };
};
