import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'support';
  created_at: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: 'customer' | 'support') => Promise<void>;
  logout: () => void;
  isSupport: boolean;
  isCustomer: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On first load, check identity with backend if token exists
  useEffect(() => {
    // Development ortamında her zaman logout ol
    if (process.env.NODE_ENV === 'development') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    const checkIdentity = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await api.get('/users/me');
          setUser(response.data);
        } catch (error) {
          // Token invalid or expired
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };
    checkIdentity();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { username, password });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, role: 'customer' | 'support') => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', { username, email, password, role });
      const { access_token, user: userData } = response.data;
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value: UserContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isSupport: user?.role === 'support',
    isCustomer: user?.role === 'customer',
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}; 