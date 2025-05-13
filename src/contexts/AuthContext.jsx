import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/v1/auth/me', { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const response = await axios.post('/api/v1/auth/login', credentials, { withCredentials: true });
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const register = async (userData) => {
    const response = await axios.post('/api/v1/auth/register', userData, { withCredentials: true });
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  const logout = async () => {
    await axios.post('/api/v1/auth/logout', {}, { withCredentials: true });
    setUser(null);
  };

  const updateProfile = async (data) => {
    const response = await axios.put('/api/v1/auth/update-profile', data, { withCredentials: true });
    if (response.data.success) {
      setUser(response.data.user);
    }
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}