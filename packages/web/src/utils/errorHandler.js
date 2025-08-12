// 統一錯誤處理工具
import { logger } from './logger'

export const logError = (error, context = '') => {
  logger.error(`${context} 錯誤`, {
    message: error.message,
    stack: error.stack,
    context
  })
}

export const handleApiError = (error, context = 'API') => {
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

export const withErrorHandling = (asyncFn, context = '') => {
  return async (...args) => {
    try {
      return await asyncFn(...args)
    } catch (error) {
      const errorResult = handleApiError(error, context)
      return { success: false, ...errorResult }
    }
  }
}

export const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key)
    } catch (error) {
      logError(error, 'localStorage.getItem')
      return null
    }
  },
  
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      logError(error, 'localStorage.setItem')
      return false
    }
  },
  
  removeItem: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      logError(error, 'localStorage.removeItem')
      return false
    }
  }
}