// Mock API 工具 - 模擬後端 API 響應
import { safeLocalStorage } from './errorHandler'

// 模擬網路延遲
const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

// 生成隨機 ID
const generateId = () => 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

// 生成 JWT Token (模擬)
const generateToken = (userId) => `mock_token_${userId}_${Date.now()}`

// Mock 用戶數據庫
let mockUsers = [
  {
    id: 'user_1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    userType: 'customer',
    createdAt: new Date().toISOString()
  },
  {
    id: 'guide_1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    password: 'password123',
    userType: 'guide',
    createdAt: new Date().toISOString()
  }
]

// Mock 導遊數據
let mockGuides = [
  {
    id: 'guide_1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    userType: 'guide',
    languages: ['中文', '英文'],
    specialties: ['歷史文化', '美食導覽'],
    location: '台北',
    rating: 4.8,
    reviews: 45,
    pricePerHour: 1500,
    avatar: '/api/placeholder/150/150',
    description: '專業台北導遊，具有5年經驗，熟悉台北各大景點與在地美食。',
    verified: true,
    availability: true
  },
  {
    id: 'guide_2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael@example.com',
    userType: 'guide',
    languages: ['中文', '英文', '日文'],
    specialties: ['攝影導覽', '自然生態'],
    location: '台中',
    rating: 4.9,
    reviews: 38,
    pricePerHour: 1800,
    avatar: '/api/placeholder/150/150',
    description: '專業攝影師兼導遊，帶您探索台中最美的景點，留下難忘回憶。',
    verified: true,
    availability: true
  }
]

// Mock 預訂數據
let mockBookings = []

// Mock 支付數據
let mockPayments = []

// Mock API 實現
export const mockApi = {
  // 認證相關
  auth: {
    // 用戶註冊
    register: async (userData) => {
      await delay(1500)
      
      // 檢查 email 是否已存在
      const existingUser = mockUsers.find(user => user.email === userData.email)
      if (existingUser) {
        throw new Error('此 Email 已被註冊')
      }
      
      // 創建新用戶
      const newUser = {
        id: generateId(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        userType: userData.userType,
        createdAt: new Date().toISOString(),
        avatar: null,
        verified: false
      }
      
      mockUsers.push(newUser)
      
      // 如果是導遊，同時創建導遊資料
      if (userData.userType === 'guide') {
        const newGuide = {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          userType: 'guide',
          languages: ['中文'],
          specialties: [],
          location: '',
          rating: 0,
          reviews: 0,
          pricePerHour: 1000,
          avatar: null,
          description: '',
          verified: false,
          availability: true
        }
        mockGuides.push(newGuide)
      }
      
      const token = generateToken(newUser.id)
      
      return {
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          userType: newUser.userType,
          avatar: newUser.avatar,
          verified: newUser.verified
        },
        token
      }
    },
    
    // 用戶登入
    login: async (email, password, userType = 'customer') => {
      await delay(1200)
      
      const user = mockUsers.find(u => 
        u.email === email && 
        u.password === password && 
        u.userType === userType
      )
      
      if (!user) {
        throw new Error('Email 或密碼錯誤')
      }
      
      const token = generateToken(user.id)
      
      return {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          avatar: user.avatar,
          verified: user.verified
        },
        token
      }
    },
    
    // 驗證 Token
    verify: async (token) => {
      await delay(500)
      
      // 簡單的 token 驗證邏輯
      if (!token || !token.startsWith('mock_token_')) {
        throw new Error('無效的 Token')
      }
      
      // 從 token 中提取用戶 ID
      const parts = token.split('_')
      if (parts.length < 4) {
        throw new Error('無效的 Token 格式')
      }
      
      const userId = parts[2]
      const user = mockUsers.find(u => u.id === userId)
      
      if (!user) {
        throw new Error('用戶不存在')
      }
      
      return {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userType: user.userType,
          avatar: user.avatar,
          verified: user.verified
        }
      }
    }
  },
  
  // 導遊相關
  guides: {
    // 獲取導遊列表
    list: async (params = {}) => {
      await delay(800)
      
      let filteredGuides = [...mockGuides]
      
      // 應用篩選條件
      if (params.location) {
        filteredGuides = filteredGuides.filter(guide => 
          guide.location.includes(params.location)
        )
      }
      
      if (params.specialty) {
        filteredGuides = filteredGuides.filter(guide => 
          guide.specialties.some(s => s.includes(params.specialty))
        )
      }
      
      if (params.language) {
        filteredGuides = filteredGuides.filter(guide => 
          guide.languages.includes(params.language)
        )
      }
      
      // 排序
      if (params.sortBy === 'rating') {
        filteredGuides.sort((a, b) => b.rating - a.rating)
      } else if (params.sortBy === 'price') {
        filteredGuides.sort((a, b) => a.pricePerHour - b.pricePerHour)
      }
      
      return {
        guides: filteredGuides,
        total: filteredGuides.length,
        page: params.page || 1,
        limit: params.limit || 10
      }
    },
    
    // 獲取導遊詳情
    detail: async (guideId) => {
      await delay(600)
      
      const guide = mockGuides.find(g => g.id === guideId)
      if (!guide) {
        throw new Error('導遊不存在')
      }
      
      return { guide }
    }
  },
  
  // 預訂相關
  bookings: {
    // 創建預訂
    create: async (bookingData) => {
      await delay(1000)
      
      const newBooking = {
        id: generateId(),
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      mockBookings.push(newBooking)
      
      return { booking: newBooking }
    },
    
    // 獲取預訂列表
    list: async (userId, userType) => {
      await delay(700)
      
      let userBookings
      if (userType === 'customer') {
        userBookings = mockBookings.filter(b => b.customerId === userId)
      } else {
        userBookings = mockBookings.filter(b => b.guideId === userId)
      }
      
      return { bookings: userBookings }
    }
  },
  
  // 支付相關
  payments: {
    // 創建支付
    create: async (paymentData) => {
      await delay(1200)
      
      const newPayment = {
        id: generateId(),
        ...paymentData,
        status: 'pending',
        address: 'TQn9Y2khEfdvmyjbi6GfrYbKGfThGGNDYJ', // Mock USDT address
        amount: paymentData.amount,
        currency: 'USDT',
        network: 'TRC20',
        createdAt: new Date().toISOString()
      }
      
      mockPayments.push(newPayment)
      
      return { payment: newPayment }
    },
    
    // 獲取匯率
    exchangeRate: async () => {
      await delay(300)
      
      return {
        USD_TO_USDT: 1.001,
        lastUpdated: new Date().toISOString()
      }
    }
  }
}

// 工具函數：重置 Mock 數據
export const resetMockData = () => {
  mockUsers = [
    {
      id: 'user_1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      userType: 'customer',
      createdAt: new Date().toISOString()
    },
    {
      id: 'guide_1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password123',
      userType: 'guide',
      createdAt: new Date().toISOString()
    }
  ]
  
  mockBookings = []
  mockPayments = []
}

// 工具函數：獲取當前 Mock 數據狀態
export const getMockDataStatus = () => {
  return {
    users: mockUsers.length,
    guides: mockGuides.length,
    bookings: mockBookings.length,
    payments: mockPayments.length
  }
}

export default mockApi