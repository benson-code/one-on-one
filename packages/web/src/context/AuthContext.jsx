import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { withErrorHandling, safeLocalStorage, logError } from '../utils/errorHandler'
import { mockApi } from '../utils/mockApi'

// 開發模式下使用 Mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' || true

const AuthContext = createContext({})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = safeLocalStorage.getItem('authToken')
    if (token) {
      // Verify token with backend
      handleVerifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = withErrorHandling(async (token) => {
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

  const handleVerifyToken = async (token) => {
    const result = await verifyToken(token)
    if (!result.success) {
      safeLocalStorage.removeItem('authToken')
      setLoading(false)
    }
  }

  const login = withErrorHandling(async (email, password, userType = 'customer') => {
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

  const register = withErrorHandling(async (userData) => {
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

  const logout = () => {
    safeLocalStorage.removeItem('authToken')
    setUser(null)
    setIsAuthenticated(false)
  }

  const googleLogin = async () => {
    if (USE_MOCK_API) {
      // Mock Google 登入
      const mockGoogleUser = {
        firstName: 'Google',
        lastName: 'User',
        email: 'google.user@example.com',
        userType: 'customer'
      }
      
      const result = await register(mockGoogleUser)
      return result
    } else {
      // 實際 Google OAuth
      window.location.href = '/api/auth/google'
    }
  }

  const appleLogin = async () => {
    if (USE_MOCK_API) {
      // Mock Apple 登入
      const mockAppleUser = {
        firstName: 'Apple',
        lastName: 'User',
        email: 'apple.user@example.com',
        userType: 'customer'
      }
      
      const result = await register(mockAppleUser)
      return result
    } else {
      // 實際 Apple Sign In
      window.location.href = '/api/auth/apple'
    }
  }

  const value = {
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