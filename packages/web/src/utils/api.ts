import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { safeLocalStorage } from './errorHandler'
import { logger } from './logger'
import { ApiResponse } from '../types'

// API 基礎配置
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.oneononetour.com'
  : 'http://localhost:3001'

// 創建 axios 實例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 請求攔截器 - 添加認證令牌
apiClient.interceptors.request.use(
  (config) => {
    const token = safeLocalStorage.getItem('authToken')
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }
    
    // 添加請求 ID 用於追蹤
    config.headers!['X-Request-ID'] = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 響應攔截器 - 處理認證錯誤和通用錯誤
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // 處理 401 未授權錯誤
    if (error.response?.status === 401) {
      safeLocalStorage.removeItem('authToken')
      window.location.href = '/login'
      return Promise.reject(new Error('登入已過期，請重新登入'))
    }
    
    // 處理 403 權限不足錯誤
    if (error.response?.status === 403) {
      return Promise.reject(new Error('您沒有權限執行此操作'))
    }
    
    // 處理 404 資源不存在錯誤
    if (error.response?.status === 404) {
      return Promise.reject(new Error('請求的資源不存在'))
    }
    
    // 處理 429 請求過於頻繁錯誤
    if (error.response?.status === 429) {
      return Promise.reject(new Error('請求過於頻繁，請稍後再試'))
    }
    
    // 處理 500 伺服器錯誤
    if (error.response?.status >= 500) {
      return Promise.reject(new Error('伺服器錯誤，請稍後再試'))
    }
    
    // 處理網路錯誤
    if (error.code === 'NETWORK_ERROR' || !error.response) {
      return Promise.reject(new Error('網路連線錯誤，請檢查您的網路連線'))
    }
    
    // 返回伺服器錯誤訊息或預設錯誤
    const errorMessage = error.response?.data?.message || error.message || '發生未知錯誤'
    return Promise.reject(new Error(errorMessage))
  }
)

// API 端點常數
export const API_ENDPOINTS = {
  // 認證相關
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    GOOGLE: '/auth/google',
    APPLE: '/auth/apple'
  },
  
  // 用戶相關
  USERS: {
    PROFILE: (userId: string) => `/users/${userId}`,
    UPDATE_PROFILE: (userId: string) => `/users/${userId}`,
    UPLOAD_AVATAR: (userId: string) => `/users/${userId}/avatar`,
    BOOKINGS: (userId: string) => `/users/${userId}/bookings`,
    NOTIFICATIONS: (userId: string) => `/users/${userId}/notifications`,
    NOTIFICATION_SETTINGS: (userId: string) => `/users/${userId}/notification-settings`,
    PAYMENT_HISTORY: (userId: string) => `/users/${userId}/payments`,
    BOOKING_STATS: (userId: string) => `/users/${userId}/booking-stats`
  },
  
  // 導遊相關
  GUIDES: {
    LIST: '/guides',
    SEARCH: '/guides/search',
    FEATURED: '/guides/featured',
    RECOMMENDED: '/guides/recommended',
    DETAIL: (guideId: string) => `/guides/${guideId}`,
    CREATE: '/guides',
    UPDATE: (guideId: string) => `/guides/${guideId}`,
    DELETE: (guideId: string) => `/guides/${guideId}`,
    AVAILABILITY: (guideId: string) => `/guides/${guideId}/availability`,
    SERVICES: (guideId: string) => `/guides/${guideId}/services`,
    REVIEWS: (guideId: string) => `/guides/${guideId}/reviews`,
    STATS: (guideId: string) => `/guides/${guideId}/stats`,
    EARNINGS: (guideId: string) => `/guides/${guideId}/earnings`,
    PAYOUT: (guideId: string) => `/guides/${guideId}/payout`,
    BOOKINGS: (guideId: string) => `/guides/${guideId}/bookings`,
    VERIFY: (guideId: string) => `/guides/${guideId}/verify`
  },
  
  // 預訂相關
  BOOKINGS: {
    CREATE: '/bookings',
    LIST: '/bookings',
    SEARCH: '/bookings/search',
    DETAIL: (bookingId: string) => `/bookings/${bookingId}`,
    UPDATE: (bookingId: string) => `/bookings/${bookingId}`,
    CONFIRM: (bookingId: string) => `/bookings/${bookingId}/confirm`,
    CANCEL: (bookingId: string) => `/bookings/${bookingId}/cancel`,
    START: (bookingId: string) => `/bookings/${bookingId}/start`,
    COMPLETE: (bookingId: string) => `/bookings/${bookingId}/complete`,
    CHECK_AVAILABILITY: '/bookings/check-availability',
    REFUND: (bookingId: string) => `/bookings/${bookingId}/refund`
  },
  
  // 支付相關
  PAYMENTS: {
    CREATE: '/payments',
    DETAIL: (paymentId: string) => `/payments/${paymentId}`,
    STATUS: (paymentId: string) => `/payments/${paymentId}/status`,
    ADDRESS: (paymentId: string) => `/payments/${paymentId}/address`,
    VERIFY: (paymentId: string) => `/payments/${paymentId}/verify`,
    REFUND: (paymentId: string) => `/payments/${paymentId}/refund`,
    WEBHOOK: (paymentId: string) => `/payments/${paymentId}/webhook`,
    EXCHANGE_RATE: '/exchange-rate'
  },
  
  // 評價相關
  REVIEWS: {
    CREATE: '/reviews',
    LIST: '/reviews',
    DETAIL: (reviewId: string) => `/reviews/${reviewId}`,
    UPDATE: (reviewId: string) => `/reviews/${reviewId}`,
    DELETE: (reviewId: string) => `/reviews/${reviewId}`,
    REPLY: (reviewId: string) => `/reviews/${reviewId}/reply`
  },
  
  // 通知相關
  NOTIFICATIONS: {
    CREATE: '/notifications',
    BULK: '/notifications/bulk',
    DETAIL: (notificationId: string) => `/notifications/${notificationId}`,
    READ: (notificationId: string) => `/notifications/${notificationId}/read`,
    DELETE: (notificationId: string) => `/notifications/${notificationId}`
  },
  
  // 檔案上傳
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    AVATAR: '/upload/avatar'
  }
} as const

// 通用 API 方法
export const apiMethods = {
  // GET 請求
  get: async <T = any>(url: string, params: Record<string, any> = {}): Promise<T> => {
    const response = await apiClient.get<T>(url, { params })
    return response.data
  },
  
  // POST 請求
  post: async <T = any>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const response = await apiClient.post<T>(url, data, config)
    return response.data
  },
  
  // PUT 請求
  put: async <T = any>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const response = await apiClient.put<T>(url, data, config)
    return response.data
  },
  
  // DELETE 請求
  delete: async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
    const response = await apiClient.delete<T>(url, config)
    return response.data
  },
  
  // PATCH 請求
  patch: async <T = any>(url: string, data: Record<string, any> = {}, config: AxiosRequestConfig = {}): Promise<T> => {
    const response = await apiClient.patch<T>(url, data, config)
    return response.data
  }
}

// 檔案上傳方法
export const uploadFile = async (
  file: File, 
  type: 'image' | 'document' = 'image', 
  onProgress?: (percent: number) => void
): Promise<ApiResponse<{ url: string; filename: string }>> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)
  
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  
  if (onProgress) {
    config.onUploadProgress = (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    }
  }
  
  const endpoint = type === 'document' 
    ? API_ENDPOINTS.UPLOAD.DOCUMENT 
    : API_ENDPOINTS.UPLOAD.IMAGE
    
  return apiMethods.post<ApiResponse<{ url: string; filename: string }>>(endpoint, formData, config)
}

// 批量上傳檔案
export const uploadMultipleFiles = async (
  files: File[], 
  type: 'image' | 'document' = 'image', 
  onProgress?: (percent: number) => void
): Promise<ApiResponse<{ urls: string[]; filenames: string[] }>> => {
  const formData = new FormData()
  
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file)
  })
  
  formData.append('type', type)
  
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  
  if (onProgress) {
    config.onUploadProgress = (progressEvent) => {
      if (progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onProgress(percentCompleted)
      }
    }
  }
  
  const endpoint = type === 'document' 
    ? API_ENDPOINTS.UPLOAD.DOCUMENT 
    : API_ENDPOINTS.UPLOAD.IMAGE
    
  return apiMethods.post<ApiResponse<{ urls: string[]; filenames: string[] }>>(endpoint, formData, config)
}

// 下載檔案
export const downloadFile = async (url: string, filename: string): Promise<void> => {
  const response = await apiClient.get(url, {
    responseType: 'blob'
  })
  
  const blob = new Blob([response.data])
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename
  link.click()
  
  window.URL.revokeObjectURL(link.href)
}

// 健康檢查
export const healthCheck = async (): Promise<{ healthy: boolean; error?: string; [key: string]: any }> => {
  try {
    const response = await apiClient.get<{ healthy: boolean; [key: string]: any }>('/health')
    return { ...response.data, healthy: true }
  } catch (error) {
    return { 
      healthy: false, 
      error: error instanceof Error ? error.message : '健康檢查失敗' 
    }
  }
}

// WebSocket 連線工具
export const createWebSocketConnection = (
  endpoint: string,
  onMessage: (data: any) => void,
  onError?: (error: Event) => void
): WebSocket => {
  const wsUrl = API_BASE_URL.replace('http', 'ws') + endpoint
  const ws = new WebSocket(wsUrl)
  
  ws.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)
    } catch (error) {
      logger.error('WebSocket 訊息解析錯誤', { 
        error: error instanceof Error ? error.message : '解析錯誤' 
      })
    }
  }
  
  ws.onerror = (error: Event) => {
    logger.error('WebSocket 錯誤', { error })
    if (onError) onError(error)
  }
  
  ws.onclose = () => {
    logger.websocket('關閉')
  }
  
  return ws
}

export default apiClient