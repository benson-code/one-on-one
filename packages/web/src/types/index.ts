// 基礎類型定義
export type UserType = 'customer' | 'guide'
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification'
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded'
export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
export type PaymentMethod = 'usdt' | 'credit_card' | 'apple_pay' | 'google_pay'
export type ServiceType = 'cultural_tour' | 'food_tour' | 'historical_tour' | 'adventure_tour' | 'shopping_tour' | 'nightlife_tour' | 'photography_tour' | 'custom_tour'
export type Language = 'zh-tw' | 'zh-cn' | 'en' | 'ja' | 'ko' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'ru' | 'ar' | 'th' | 'vi'
export type NotificationType = 'booking_confirmed' | 'booking_cancelled' | 'payment_received' | 'review_received' | 'guide_message' | 'system_update'
export type Region = 'asia' | 'europe' | 'north_america' | 'south_america' | 'africa' | 'oceania'

// 用戶類型
export interface User {
  id: string | null
  email: string
  firstName: string
  lastName: string
  avatar: string | null
  userType: UserType
  status: UserStatus
  phoneNumber: string
  location: string
  languages: Language[]
  createdAt: string
  updatedAt: string
}

// 醫師/導遊類型
export interface Guide extends User {
  userType: 'guide'
  bio: string
  specialties: string[]
  services: ServiceType[]
  hourlyRate: number
  rating: number
  reviewCount: number
  totalBookings: number
  verified: boolean
  availability: Record<string, any>
  bankAccount: string | null
  walletAddress: string
  responseTime: string
}

// 客戶類型
export interface Customer extends User {
  userType: 'customer'
  preferences: string[]
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  } | null
}

// 預訂類型
export interface Booking {
  id: string | null
  customerId: string | null
  guideId: string | null
  customer?: Customer
  guide?: Guide
  date: string
  time: string
  duration: number
  guests: number
  totalAmount: number
  currency: string
  status: BookingStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod | null
  specialRequests: string
  location: string
  meetingPoint: string
  customerNotes: string
  guideNotes: string
  createdAt: string
  updatedAt: string
}

// 評論類型
export interface Review {
  id: string | null
  bookingId: string | null
  customerId: string | null
  guideId: string | null
  customer?: Customer
  guide?: Guide
  rating: number
  comment: string
  photos: string[]
  createdAt: string
  guideReply: string | null
  replyDate: string | null
}

// 通知類型
export interface Notification {
  id: string | null
  userId: string | null
  type: NotificationType
  title: string
  message: string
  read: boolean
  data: Record<string, any>
  createdAt: string
}

// Context 狀態類型
export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string, userType: UserType) => Promise<{ success: boolean; user?: User; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; user?: User; error?: string }>
  logout: () => void
  googleLogin: () => Promise<{ success: boolean; user?: User; error?: string }>
  appleLogin: () => Promise<{ success: boolean; user?: User; error?: string }>
}

export interface GuideContextType {
  guides: Guide[]
  selectedGuide: Guide | null
  loading: boolean
  error: string | null
  fetchGuides: () => Promise<void>
  searchGuides: (query: string, filters?: GuideFilters) => Promise<Guide[]>
  getGuideById: (id: string) => Promise<Guide | null>
  setSelectedGuide: (guide: Guide | null) => void
}

export interface BookingContextType {
  bookings: Booking[]
  currentBooking: Booking | null
  loading: boolean
  error: string | null
  createBooking: (bookingData: CreateBookingData) => Promise<{ success: boolean; booking?: Booking; error?: string }>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<{ success: boolean; booking?: Booking; error?: string }>
  cancelBooking: (id: string, reason?: string) => Promise<{ success: boolean; error?: string }>
  fetchBookings: (userId: string, userType: UserType) => Promise<void>
  setCurrentBooking: (booking: Booking | null) => void
}

export interface PaymentContextType {
  paymentMethods: PaymentMethod[]
  selectedPaymentMethod: PaymentMethod | null
  processing: boolean
  error: string | null
  processPayment: (bookingId: string, paymentData: PaymentData) => Promise<{ success: boolean; error?: string }>
  addPaymentMethod: (method: PaymentMethod) => Promise<{ success: boolean; error?: string }>
  removePaymentMethod: (method: PaymentMethod) => Promise<{ success: boolean; error?: string }>
  setSelectedPaymentMethod: (method: PaymentMethod | null) => void
}

export interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  loading: boolean
  showNotification: (type: 'success' | 'error' | 'info' | 'warning', message: string) => void
  hideNotification: (id: string) => void
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
  fetchNotifications: (userId: string) => Promise<void>
}

export interface LanguageContextType {
  currentLanguage: Language
  translations: Record<string, string>
  changeLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

// 表單資料類型
export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  userType: UserType
  phoneNumber: string
  location: string
}

export interface LoginData {
  email: string
  password: string
  userType: UserType
}

export interface CreateBookingData {
  guideId: string
  date: string
  time: string
  duration: number
  guests: number
  specialRequests?: string
  location: string
  meetingPoint: string
}

export interface PaymentData {
  paymentMethod: PaymentMethod
  amount: number
  currency: string
  walletAddress?: string
  cardDetails?: {
    number: string
    expiryMonth: string
    expiryYear: string
    cvv: string
    name: string
  }
}

// 篩選類型
export interface GuideFilters {
  location?: string
  services?: ServiceType[]
  languages?: Language[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: number
  availability?: {
    date: string
    time: string
  }
}

// API 響應類型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// 常量
export const UserTypes = {
  CUSTOMER: 'customer' as const,
  GUIDE: 'guide' as const
}

export const UserStatuses = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  SUSPENDED: 'suspended' as const,
  PENDING_VERIFICATION: 'pending_verification' as const
}

export const BookingStatuses = {
  PENDING: 'pending' as const,
  CONFIRMED: 'confirmed' as const,
  IN_PROGRESS: 'in_progress' as const,
  COMPLETED: 'completed' as const,
  CANCELLED: 'cancelled' as const,
  REFUNDED: 'refunded' as const
}

export const PaymentStatuses = {
  PENDING: 'pending' as const,
  PROCESSING: 'processing' as const,
  COMPLETED: 'completed' as const,
  FAILED: 'failed' as const,
  REFUNDED: 'refunded' as const
}

export const PaymentMethods = {
  USDT: 'usdt' as const,
  CREDIT_CARD: 'credit_card' as const,
  APPLE_PAY: 'apple_pay' as const,
  GOOGLE_PAY: 'google_pay' as const
}

export const ServiceTypes = {
  CULTURAL_TOUR: 'cultural_tour' as const,
  FOOD_TOUR: 'food_tour' as const,
  HISTORICAL_TOUR: 'historical_tour' as const,
  ADVENTURE_TOUR: 'adventure_tour' as const,
  SHOPPING_TOUR: 'shopping_tour' as const,
  NIGHTLIFE_TOUR: 'nightlife_tour' as const,
  PHOTOGRAPHY_TOUR: 'photography_tour' as const,
  CUSTOM_TOUR: 'custom_tour' as const
}

export const Languages = {
  ZH_TW: 'zh-tw' as const,
  ZH_CN: 'zh-cn' as const,
  EN: 'en' as const,
  JA: 'ja' as const,
  KO: 'ko' as const,
  ES: 'es' as const,
  FR: 'fr' as const,
  DE: 'de' as const,
  IT: 'it' as const,
  PT: 'pt' as const,
  RU: 'ru' as const,
  AR: 'ar' as const,
  TH: 'th' as const,
  VI: 'vi' as const
}

export const NotificationTypes = {
  BOOKING_CONFIRMED: 'booking_confirmed' as const,
  BOOKING_CANCELLED: 'booking_cancelled' as const,
  PAYMENT_RECEIVED: 'payment_received' as const,
  REVIEW_RECEIVED: 'review_received' as const,
  GUIDE_MESSAGE: 'guide_message' as const,
  SYSTEM_UPDATE: 'system_update' as const
}

export const RatingLevels = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  TERRIBLE: 1
} as const

export const Regions = {
  ASIA: 'asia' as const,
  EUROPE: 'europe' as const,
  NORTH_AMERICA: 'north_america' as const,
  SOUTH_AMERICA: 'south_america' as const,
  AFRICA: 'africa' as const,
  OCEANIA: 'oceania' as const
}

// 驗證函數
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 8
}

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone) && phone.length >= 10
}

// 格式化函數
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('zh-TW')
}

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('zh-TW')
}

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// 預設資料創建函數
export const createDefaultUser = (userType: UserType = UserTypes.CUSTOMER): User => ({
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  avatar: null,
  userType,
  status: UserStatuses.ACTIVE,
  phoneNumber: '',
  location: '',
  languages: [Languages.ZH_TW],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export const createDefaultGuide = (): Guide => ({
  ...createDefaultUser(UserTypes.GUIDE),
  userType: 'guide' as const,
  bio: '',
  specialties: [],
  services: [],
  hourlyRate: 50,
  rating: 0,
  reviewCount: 0,
  totalBookings: 0,
  verified: false,
  availability: {},
  bankAccount: null,
  walletAddress: '',
  responseTime: '< 2 hours'
})

export const createDefaultBooking = (): Booking => ({
  id: null,
  customerId: null,
  guideId: null,
  date: '',
  time: '',
  duration: 4,
  guests: 1,
  totalAmount: 0,
  currency: 'USD',
  status: BookingStatuses.PENDING,
  paymentStatus: PaymentStatuses.PENDING,
  paymentMethod: null,
  specialRequests: '',
  location: '',
  meetingPoint: '',
  customerNotes: '',
  guideNotes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export const createDefaultReview = (): Review => ({
  id: null,
  bookingId: null,
  customerId: null,
  guideId: null,
  rating: RatingLevels.EXCELLENT,
  comment: '',
  photos: [],
  createdAt: new Date().toISOString(),
  guideReply: null,
  replyDate: null
})

export const createDefaultNotification = (): Notification => ({
  id: null,
  userId: null,
  type: NotificationTypes.SYSTEM_UPDATE,
  title: '',
  message: '',
  read: false,
  data: {},
  createdAt: new Date().toISOString()
})