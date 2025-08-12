import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// User types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: 'customer' | 'guide';
  avatar?: string;
  createdAt: string;
}

// Auth response types
interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

// User registration data
export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'customer' | 'guide';
  [key: string]: any; // Allow additional fields
}

// Context value interface
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, userType?: 'customer' | 'guide') => Promise<AuthResponse>;
  register: (userData: UserRegistrationData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// Provider props interface
interface AuthProviderProps {
  children: ReactNode;
}

// Create context with default values
const AuthContext = createContext<AuthContextValue>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => ({ success: false, error: 'Context not initialized' }),
  register: async () => ({ success: false, error: 'Context not initialized' }),
  logout: async () => {},
});

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async (): Promise<void> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        await verifyToken(token);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token: string): Promise<void> => {
    try {
      const response = await axios.get<{ user: User }>('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      await AsyncStorage.removeItem('authToken');
      console.error('Token verification failed:', error);
    }
  };

  const login = async (
    email: string, 
    password: string, 
    userType: 'customer' | 'guide' = 'customer'
  ): Promise<AuthResponse> => {
    try {
      const response = await axios.post<LoginResponse>('/api/auth/login', {
        email,
        password,
        userType
      });
      
      const { user, token } = response.data;
      await AsyncStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (userData: UserRegistrationData): Promise<AuthResponse> => {
    try {
      const response = await axios.post<RegisterResponse>('/api/auth/register', userData);
      const { user, token } = response.data;
      
      await AsyncStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true, user };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('authToken');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}