// 用戶相關類型
export const UserTypes = {
  CUSTOMER: 'customer',
  GUIDE: 'guide'
}

export const UserStatus = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING_VERIFICATION: 'pending_verification'
}

// 預訂相關類型
export const BookingStatus = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
}

export const PaymentStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded'
}

export const PaymentMethods = {
  USDT: 'usdt',
  CREDIT_CARD: 'credit_card',
  APPLE_PAY: 'apple_pay',
  GOOGLE_PAY: 'google_pay'
}

// 導遊服務類型
export const ServiceTypes = {
  CULTURAL_TOUR: 'cultural_tour',
  FOOD_TOUR: 'food_tour',
  HISTORICAL_TOUR: 'historical_tour',
  ADVENTURE_TOUR: 'adventure_tour',
  SHOPPING_TOUR: 'shopping_tour',
  NIGHTLIFE_TOUR: 'nightlife_tour',
  PHOTOGRAPHY_TOUR: 'photography_tour',
  CUSTOM_TOUR: 'custom_tour'
}

// 語言列表
export const Languages = {
  ZH_TW: 'zh-tw',
  ZH_CN: 'zh-cn',
  EN: 'en',
  JA: 'ja',
  KO: 'ko',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
  IT: 'it',
  PT: 'pt',
  RU: 'ru',
  AR: 'ar',
  TH: 'th',
  VI: 'vi'
}

// 通知類型
export const NotificationTypes = {
  BOOKING_CONFIRMED: 'booking_confirmed',
  BOOKING_CANCELLED: 'booking_cancelled',
  PAYMENT_RECEIVED: 'payment_received',
  REVIEW_RECEIVED: 'review_received',
  GUIDE_MESSAGE: 'guide_message',
  SYSTEM_UPDATE: 'system_update'
}

// 評分等級
export const RatingLevels = {
  EXCELLENT: 5,
  GOOD: 4,
  AVERAGE: 3,
  POOR: 2,
  TERRIBLE: 1
}

// 地區代碼
export const Regions = {
  ASIA: 'asia',
  EUROPE: 'europe',
  NORTH_AMERICA: 'north_america',
  SOUTH_AMERICA: 'south_america',
  AFRICA: 'africa',
  OCEANIA: 'oceania'
}

// 資料驗證工具
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  return password.length >= 8
}

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s-()]+$/
  return phoneRegex.test(phone) && phone.length >= 10
}

// 日期工具
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('zh-TW')
}

export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('zh-TW')
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// 預設資料結構
export const createDefaultUser = (userType = UserTypes.CUSTOMER) => ({
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  avatar: null,
  userType,
  status: UserStatus.ACTIVE,
  phoneNumber: '',
  location: '',
  languages: [Languages.ZH_TW],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export const createDefaultGuide = () => ({
  ...createDefaultUser(UserTypes.GUIDE),
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

export const createDefaultBooking = () => ({
  id: null,
  customerId: null,
  guideId: null,
  date: '',
  time: '',
  duration: 4,
  guests: 1,
  totalAmount: 0,
  currency: 'USD',
  status: BookingStatus.PENDING,
  paymentStatus: PaymentStatus.PENDING,
  paymentMethod: null,
  specialRequests: '',
  location: '',
  meetingPoint: '',
  customerNotes: '',
  guideNotes: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
})

export const createDefaultReview = () => ({
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

export const createDefaultNotification = () => ({
  id: null,
  userId: null,
  type: NotificationTypes.SYSTEM_UPDATE,
  title: '',
  message: '',
  read: false,
  data: {},
  createdAt: new Date().toISOString()
})