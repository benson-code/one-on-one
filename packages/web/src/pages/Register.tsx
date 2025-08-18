import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Mail, Lock, Eye, EyeOff, User, AlertCircle, Stethoscope, CheckCircle } from 'lucide-react'
import { RegisterData } from '../types'

interface AuthResult {
  success: boolean
  error?: string
  user?: {
    userType: 'customer' | 'guide'
  }
}

function Register(): JSX.Element {
  const { register, googleLogin, appleLogin } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState<RegisterData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'customer',
    phoneNumber: '',
    location: ''
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('First name is required')
      return false
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    setError('')

    const result: AuthResult = await register(formData)
    
    if (result.success && result.user) {
      const redirectPath = result.user.userType === 'guide' 
        ? '/guide/dashboard' 
        : '/customer/dashboard'
      navigate(redirectPath)
    } else {
      setError(result.error || 'Registration failed')
    }
    
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    try {
      await googleLogin()
    } catch (error) {
      setError('Google registration failed')
    }
  }

  const handleAppleLogin = async () => {
    try {
      await appleLogin()
    } catch (error) {
      setError('Apple registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">註冊</h2>
            <p className="text-dark-300 mt-2">Join the One on One community</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <span className="text-red-300">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection with Enhanced UI */}
            <div>
              <label className="block text-sm font-medium mb-3">
                選擇註冊身份
              </label>
              
              {/* Current Selection Indicator */}
              <div className="mb-4 p-3 bg-dark-700/50 rounded-lg border border-dark-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full animate-pulse ${
                      formData.userType === 'customer' ? 'bg-green-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-sm">
                      目前選擇：
                      <span className={`ml-1 font-medium ${
                        formData.userType === 'customer' ? 'text-green-400' : 'text-blue-400'
                      }`}>
                        {formData.userType === 'customer' ? '患者/客戶' : '醫療顧問'}
                      </span>
                    </span>
                  </div>
                  <CheckCircle className={`w-4 h-4 ${
                    formData.userType === 'customer' ? 'text-green-500' : 'text-blue-500'
                  }`} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, userType: 'customer'})}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform ${
                    formData.userType === 'customer'
                      ? 'border-green-500 bg-green-500/10 scale-105 shadow-lg shadow-green-500/25'
                      : 'border-dark-600 hover:border-dark-500 hover:scale-102'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <User className={`w-6 h-6 transition-colors ${
                      formData.userType === 'customer' ? 'text-green-500' : 'text-dark-400'
                    }`} />
                    <span className="font-medium">患者/客戶</span>
                    <span className="text-xs text-dark-400 text-center">
                      尋求醫療服務與諮詢
                    </span>
                  </div>
                  {formData.userType === 'customer' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full">
                      <div className="w-full h-full bg-green-500 rounded-full animate-ping" />
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, userType: 'guide'})}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 transform ${
                    formData.userType === 'guide'
                      ? 'border-blue-500 bg-blue-500/10 scale-105 shadow-lg shadow-blue-500/25'
                      : 'border-dark-600 hover:border-dark-500 hover:scale-102'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Stethoscope className={`w-6 h-6 transition-colors ${
                      formData.userType === 'guide' ? 'text-blue-500' : 'text-dark-400'
                    }`} />
                    <span className="font-medium">醫療顧問</span>
                    <span className="text-xs text-dark-400 text-center">
                      提供專業醫療服務
                    </span>
                  </div>
                  {formData.userType === 'guide' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full">
                      <div className="w-full h-full bg-blue-500 rounded-full animate-ping" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic Content Based on User Type */}
            {formData.userType === 'guide' && (
              <div className="space-y-4 p-4 bg-blue-900/20 rounded-xl border border-blue-700/30 transition-all duration-500">
                <div className="flex items-center space-x-2 mb-3">
                  <Stethoscope className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-blue-300">專業資訊</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">專業領域</label>
                    <select 
                      name="specialty"
                      className="input-field bg-blue-900/30 border-blue-600 focus:border-blue-400"
                      onChange={handleSelectChange}
                    >
                      <option value="">選擇專業領域</option>
                      <option value="cardiology">心臟科</option>
                      <option value="orthopedics">骨科</option>
                      <option value="neurology">神經科</option>
                      <option value="oncology">腫瘤科</option>
                      <option value="dermatology">皮膚科</option>
                      <option value="general">全科醫學</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-blue-200">執業年資</label>
                    <select 
                      name="experience"
                      className="input-field bg-blue-900/30 border-blue-600 focus:border-blue-400"
                      onChange={handleSelectChange}
                    >
                      <option value="">選擇執業年資</option>
                      <option value="1-3">1-3年</option>
                      <option value="4-7">4-7年</option>
                      <option value="8-15">8-15年</option>
                      <option value="15+">15年以上</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-blue-200">執業證書號碼</label>
                  <input
                    name="licenseNumber"
                    type="text"
                    className="input-field bg-blue-900/30 border-blue-600 focus:border-blue-400"
                    placeholder="請輸入執業證書號碼"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}


            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
名字
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-dark-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
姓氏
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
電子郵件
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
密碼
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-dark-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-dark-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
確認密碼
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-dark-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field pl-10 pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-dark-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-dark-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Enhanced Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary w-full relative overflow-hidden transition-all duration-300 ${
                loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-primary-500/25'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {loading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                <span>
                  {loading 
                    ? '建立帳戶中...' 
                    : `註冊為${formData.userType === 'customer' ? '患者/客戶' : '醫療顧問'}`
                  }
                </span>
                {formData.userType === 'customer' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Stethoscope className="w-4 h-4" />
                )}
              </div>
              
              {!loading && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 mb-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dark-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-dark-800 text-dark-400">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-dark-600 rounded-xl text-white bg-dark-700 hover:bg-dark-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
使用 Google 註冊
            </button>

            <button
              type="button"
              onClick={handleAppleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-dark-600 rounded-xl text-white bg-dark-700 hover:bg-dark-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2.01.77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
使用 Apple 註冊
            </button>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center text-sm text-dark-400">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-dark-300">Already have an account? </span>
            <Link 
              to="/login" 
              className="text-primary-500 hover:text-primary-400 transition-colors font-medium"
            >
登入
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register