import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { withErrorHandling, safeLocalStorage } from '../utils/errorHandler'
import { mockApi } from '../utils/mockApi'
import { AuthContextType, User, UserType, RegisterData } from '../types'

// 開發模式下使用 Mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' || true

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
  login: async () => ({ success: false, error: 'Not implemented' }),
  register: async () => ({ success: false, error: 'Not implemented' }),
  logout: () => {},
  googleLogin: async () => ({ success: false, error: 'Not implemented' }),
  appleLogin: async () => ({ success: false, error: 'Not implemented' })
})

export function useAuth(): AuthContextType {
  return useContext(AuthContext)
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const token = safeLocalStorage.getItem('authToken')
    if (token) {
      handleVerifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = withErrorHandling(async (token: string) => {
    if (USE_MOCK_API) {
      const response = await mockApi.auth.verify(token)
      setUser(response.user)
      setIsAuthenticated(true)
      setLoading(false)
      return { success: true }
    } else {
      const response = await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(response.data.user)
      setIsAuthenticated(true)
      setLoading(false)
      return { success: true }
    }
  }, 'Token verification')

  const handleVerifyToken = async (token: string): Promise<void> => {
    const result = await verifyToken(token)
    if (!result.success) {
      safeLocalStorage.removeItem('authToken')
      setLoading(false)
    }
  }

  const login = withErrorHandling(async (email: string, password: string, userType: UserType = 'customer') => {
    if (USE_MOCK_API) {
      const response = await mockApi.auth.login(email, password, userType)
      const { user, token } = response
      safeLocalStorage.setItem('authToken', token)
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true, user }
    } else {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
        userType
      })
      
      const { user, token } = response.data
      safeLocalStorage.setItem('authToken', token)
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true, user }
    }
  }, 'User login')

  const register = withErrorHandling(async (userData: RegisterData) => {
    if (USE_MOCK_API) {
      const response = await mockApi.auth.register(userData)
      const { user, token } = response
      
      safeLocalStorage.setItem('authToken', token)
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true, user }
    } else {
      const response = await axios.post('/api/auth/register', userData)
      const { user, token } = response.data
      
      safeLocalStorage.setItem('authToken', token)
      setUser(user)
      setIsAuthenticated(true)
      
      return { success: true, user }
    }
  }, 'User registration')

  const logout = (): void => {
    safeLocalStorage.removeItem('authToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  const googleLogin = async (): Promise<{ success: boolean; user?: User; error?: string }> => {
    if (USE_MOCK_API) {
      // Mock Google 登入
      const mockGoogleUser: RegisterData = {
        firstName: 'Google',
        lastName: 'User',
        email: 'google.user@example.com',
        password: 'mock_password',
        confirmPassword: 'mock_password',
        userType: 'customer',
        phoneNumber: '+886-900-000-000',
        location: '台北市'
      }
      
      const result = await register(mockGoogleUser)
      return result
    } else {
      // 實際 Google OAuth
      window.location.href = '/api/auth/google'
      return { success: true }
    }
  }

  const appleLogin = async (): Promise<{ success: boolean; user?: User; error?: string }> => {
    if (USE_MOCK_API) {
      // Mock Apple 登入
      const mockAppleUser: RegisterData = {
        firstName: 'Apple',
        lastName: 'User',
        email: 'apple.user@example.com',
        password: 'mock_password',
        confirmPassword: 'mock_password',
        userType: 'customer',
        phoneNumber: '+886-900-000-001',
        location: '台北市'
      }
      
      const result = await register(mockAppleUser)
      return result
    } else {
      // 實際 Apple Sign In
      window.location.href = '/api/auth/apple'
      return { success: true }
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    googleLogin,
    appleLogin
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}