// Mock API 工具 - 模擬後端 API 響應
import { 
  User, 
  Guide, 
  Booking, 
  UserType, 
  RegisterData, 
  createDefaultUser,
  createDefaultGuide
} from '../types'

// 模擬網路延遲
const delay = (ms: number = 1000): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

// 生成隨機 ID
const generateId = (): string => 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

// 生成 JWT Token (模擬)
const generateToken = (userId: string): string => `mock_token_${userId}_${Date.now()}`

// 安全的環境變數讀取
const getEnvVar = (key: string, defaultValue: string = ''): string => {
  return import.meta.env[key] || defaultValue
}

// Mock 用戶數據庫 - 使用環境變數
let mockUsers: User[] = [
  {
    id: 'user_1',
    firstName: 'John',
    lastName: 'Doe',
    email: getEnvVar('VITE_MOCK_CUSTOMER_EMAIL', 'john@example.com'),
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHjsUkZzwhLyFw9pRz9dYP3ajmxNZddc1ljPKIH87W11KW53-5DRP_8rjFOw1-DfZsIQPkQd0saOHD6am1ikrEQE7ELbV3dbEnjgCLADN2iPTazggASW7cDOIj_rsdc2rVgxpP3U0CmRM1vK4qW0MnuPPkofx1LJq2OrRip8NCxzJ2zajEMYKgdTN_XTnrTVFqw9xVsxlGxhku-CXlCq4qLN54IF8Arnyo20A2bSODvCmiCMhu3INZy0sm2Mz1HJipAdLY9Phd8Y1',
    userType: 'customer',
    status: 'active',
    phoneNumber: '+886-912-345-678',
    location: '台北市',
    languages: ['zh-tw', 'en'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'guide_1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: getEnvVar('VITE_MOCK_GUIDE_EMAIL', 'jane@example.com'),
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuw14G_CKB4TosNeKnhsIxlF0KqI8C0HvPHfxyeHq9vBPhPCJc9qQyvN6f8UvTkWdJTA-aMvCoEV7gd8LMzk8SS9dV5W5CqOCjfDGJs4Xmztc6zoeLqh0ihl9Ms0gB5LYIYAAwzxfMliiTGlvdhNe8aLDt3eSH93DxXn1YlYRsYc4vRnw4IOMfOUYsxaGKl1P3DIInVMeA_pRa20Uj12toU-4-ECy-UJ3H2lh21A073-c8xhndShbX03M4g8Z1VPJ-s4ZbiRJO5kOf',
    userType: 'guide',
    status: 'active',
    phoneNumber: '+886-987-654-321',
    location: '台北市',
    languages: ['zh-tw', 'en'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// Mock 導遊數據
let mockGuides: Guide[] = [
  {
    ...createDefaultGuide(),
    id: 'guide_1',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuw14G_CKB4TosNeKnhsIxlF0KqI8C0HvPHfxyeHq9vBPhPCJc9qQyvN6f8UvTkWdJTA-aMvCoEV7gd8LMzk8SS9dV5W5CqOCjfDGJs4Xmztc6zoeLqh0ihl9Ms0gB5LYIYAAwzxfMliiTGlvdhNe8aLDt3eSH93DxXn1YlYRsYc4vRnw4IOMfOUYsxaGKl1P3DIInVMeA_pRa20Uj12toU-4-ECy-UJ3H2lh21A073-c8xhndShbX03M4g8Z1VPJ-s4ZbiRJO5kOf',
    languages: ['zh-tw', 'en'],
    specialties: ['歷史文化', '美食導覽'],
    location: '台北',
    rating: 4.8,
    reviewCount: 45,
    hourlyRate: 1500,
    bio: '專業台北導遊，具有5年經驗，熟悉台北各大景點與在地美食。',
    verified: true
  },
  {
    ...createDefaultGuide(),
    id: 'guide_2',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALacbFfxSjTlNhxRJgDzPBjhholoPMjTLy_VNi3URH7YFh8nnYFd5xS08UcAKKe_m0Gz1__xI95V1pCsRsNZ8uktdgIpyZgzvSdBk2jEF5dbOtrcqKN_C976g66tVpmm_0PTle-2TjAMRLA-hAAC58cdFgN8lBKk7IBUtxLZnDHv-q7rp66wmErtHJtbzJ7lCFOtFuXA2F9yrEthhRsAeo_hURA6u1x8IfQ0LFhoO875z4Hq_3JnUT6yiZrSvFjy7TFXeechDQ1hN4',
    languages: ['zh-tw', 'en', 'ja'],
    specialties: ['攝影導覽', '自然生態'],
    location: '台中',
    rating: 4.9,
    reviewCount: 38,
    hourlyRate: 1800,
    bio: '專業攝影師兼導遊，帶您探索台中最美的景點，留下難忘回憶。',
    verified: true
  }
]

// Mock 預訂數據
let mockBookings: Booking[] = []

// Mock API 實現
export const mockApi = {
  // 認證相關
  auth: {
    // 用戶註冊
    register: async (userData: RegisterData): Promise<{ user: User; token: string }> => {
      await delay(1500)
      
      // 檢查 email 是否已存在
      const existingUser = mockUsers.find(user => user.email === userData.email)
      if (existingUser) {
        throw new Error('此 Email 已被註冊')
      }
      
      // 創建新用戶
      const newUser: User = {
        ...createDefaultUser(userData.userType),
        id: generateId(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        location: userData.location,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // 添加到數據庫
      mockUsers.push(newUser)
      
      // 如果是導遊，也添加到導遊列表
      if (userData.userType === 'guide') {
        const newGuide: Guide = {
          ...createDefaultGuide(),
          ...newUser,
          userType: 'guide' as const
        }
        mockGuides.push(newGuide)
      }
      
      // 生成 Token
      const token = generateToken(newUser.id!)
      
      return { user: newUser, token }
    },
    
    // 用戶登入
    login: async (email: string, password: string, userType: UserType): Promise<{ user: User; token: string }> => {
      await delay(1200)
      
      // 預設測試密碼
      const validPasswords = ['password123', 'secure_password_123', 'secure_password_456']
      
      // 查找用戶
      const user = mockUsers.find(u => u.email === email && u.userType === userType)
      
      if (!user) {
        throw new Error('用戶不存在或用戶類型不匹配')
      }
      
      // 檢查密碼 (在實際應用中應該使用加密比較)
      if (!validPasswords.includes(password)) {
        throw new Error('密碼錯誤')
      }
      
      // 生成 Token
      const token = generateToken(user.id!)
      
      return { user, token }
    },
    
    // 驗證 Token
    verify: async (token: string): Promise<{ user: User }> => {
      await delay(500)
      
      // 從 Token 中解析用戶 ID (模擬)
      const userId = token.split('_')[2]
      const user = mockUsers.find(u => u.id === userId)
      
      if (!user) {
        throw new Error('無效的令牌')
      }
      
      return { user }
    }
  },
  
  // 導遊相關
  guides: {
    // 獲取所有導遊
    getAll: async (): Promise<Guide[]> => {
      await delay(800)
      return mockGuides
    },
    
    // 根據 ID 獲取導遊
    getById: async (id: string): Promise<Guide> => {
      await delay(600)
      const guide = mockGuides.find(g => g.id === id)
      if (!guide) {
        throw new Error('導遊不存在')
      }
      return guide
    },
    
    // 搜索導遊
    search: async (query: string, filters?: any): Promise<Guide[]> => {
      await delay(1000)
      
      let results = mockGuides
      
      // 根據名字或位置搜索
      if (query) {
        results = results.filter(guide => 
          guide.firstName.toLowerCase().includes(query.toLowerCase()) ||
          guide.lastName.toLowerCase().includes(query.toLowerCase()) ||
          guide.location.toLowerCase().includes(query.toLowerCase())
        )
      }
      
      // 應用其他篩選器
      if (filters) {
        if (filters.location) {
          results = results.filter(guide => 
            guide.location.toLowerCase().includes(filters.location.toLowerCase())
          )
        }
        
        if (filters.minRating) {
          results = results.filter(guide => guide.rating >= filters.minRating)
        }
        
        if (filters.maxPrice) {
          results = results.filter(guide => guide.hourlyRate <= filters.maxPrice)
        }
      }
      
      return results
    }
  },
  
  // 預訂相關
  bookings: {
    // 創建預訂
    create: async (bookingData: any): Promise<Booking> => {
      await delay(1500)
      
      const newBooking: Booking = {
        id: generateId(),
        customerId: bookingData.customerId,
        guideId: bookingData.guideId,
        date: bookingData.date,
        time: bookingData.time,
        duration: bookingData.duration,
        guests: bookingData.guests,
        totalAmount: bookingData.totalAmount,
        currency: 'USD',
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: null,
        specialRequests: bookingData.specialRequests || '',
        location: bookingData.location,
        meetingPoint: bookingData.meetingPoint,
        customerNotes: bookingData.customerNotes || '',
        guideNotes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      mockBookings.push(newBooking)
      return newBooking
    },
    
    // 獲取用戶的預訂
    getByUser: async (userId: string, userType: UserType): Promise<Booking[]> => {
      await delay(800)
      
      if (userType === 'customer') {
        return mockBookings.filter(booking => booking.customerId === userId)
      } else {
        return mockBookings.filter(booking => booking.guideId === userId)
      }
    }
  }
}

export default mockApi