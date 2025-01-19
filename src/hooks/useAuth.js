import { login as apiLogin, logout as apiLogout } from '../services/userService';

export const useAuth = () => {
  const login = async (email, password) => {
    return apiLogin({ email, password });
  };

  const logout = async () => {
    await apiLogout();
  };

  return {
    login,
    logout
  };
};
