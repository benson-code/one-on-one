// 統一錯誤處理工具
import { logger } from './logger'

// 錯誤代碼類型
export type ErrorCode = 
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'RATE_LIMIT'
  | 'SERVER_ERROR'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR'

// 錯誤結果類型
export interface ErrorResult {
  error: string
  code: ErrorCode
}

// API 錯誤類型
export interface ApiError {
  response?: {
    status: number
    data?: {
      message?: string
    }
  }
  request?: any
  message: string
  stack?: string
}

// 異步函數返回類型
export interface AsyncResult<T = any> {
  success: boolean
  data?: T
  error?: string
  code?: ErrorCode
}

export const logError = (error: Error | ApiError, context: string = ''): void => {
  logger.error(`${context} 錯誤`, {
    message: error.message,
    stack: error.stack,
    context
  })
}

export const handleApiError = (error: ApiError, context: string = 'API'): ErrorResult => {
  logError(error, context)
  
  if (error.response) {
    // 服務器回應錯誤
    const status = error.response.status
    const message = error.response.data?.message || error.message
    
    switch (status) {
      case 401:
        return { error: '認證失敗，請重新登入', code: 'UNAUTHORIZED' }
      case 403:
        return { error: '權限不足', code: 'FORBIDDEN' }
      case 404:
        return { error: '請求的資源不存在', code: 'NOT_FOUND' }
      case 422:
        return { error: message || '輸入資料有誤', code: 'VALIDATION_ERROR' }
      case 429:
        return { error: '請求過於頻繁，請稍後再試', code: 'RATE_LIMIT' }
      case 500:
        return { error: '服務器內部錯誤', code: 'SERVER_ERROR' }
      default:
        return { error: message || '請求失敗', code: 'API_ERROR' }
    }
  } else if (error.request) {
    // 網路錯誤
    return { error: '網路連接失敗，請檢查網路設定', code: 'NETWORK_ERROR' }
  } else {
    // 其他錯誤
    return { error: error.message || '未知錯誤', code: 'UNKNOWN_ERROR' }
  }
}

export const withErrorHandling = <T extends (...args: any[]) => Promise<any>>(
  asyncFn: T, 
  context: string = ''
) => {
  return async (...args: Parameters<T>): Promise<AsyncResult<Awaited<ReturnType<T>>>> => {
    try {
      const result = await asyncFn(...args)
      return { success: true, data: result }
    } catch (error) {
      const errorResult = handleApiError(error as ApiError, context)
      return { success: false, ...errorResult }
    }
  }
}

// 安全的 localStorage 操作
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      logError(error as Error, 'localStorage.getItem')
      return null
    }
  },
  
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      logError(error as Error, 'localStorage.setItem')
      return false
    }
  },
  
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      logError(error as Error, 'localStorage.removeItem')
      return false
    }
  }
}

// 安全的 JSON 解析
export const safeJSONParse = <T = any>(jsonString: string, defaultValue: T): T => {
  try {
    return JSON.parse(jsonString) as T
  } catch (error) {
    logError(error as Error, 'JSON.parse')
    return defaultValue
  }
}

// 安全的 JSON 字符串化
export const safeJSONStringify = (obj: any): string => {
  try {
    return JSON.stringify(obj)
  } catch (error) {
    logError(error as Error, 'JSON.stringify')
    return '{}'
  }
}

// 重試機制
export const withRetry = <T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  maxRetries: number = 3,
  delay: number = 1000
) => {
  return async (...args: Parameters<T>): Promise<Awaited<ReturnType<T>>> => {
    let lastError: Error
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await asyncFn(...args)
      } catch (error) {
        lastError = error as Error
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, delay * attempt))
        }
      }
    }
    
    throw lastError!
  }
}

// 防抖函數
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(null, args), wait)
  }
}

// 節流函數
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}