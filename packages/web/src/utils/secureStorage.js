// 安全存儲工具 - 提供加密和過期機制

import { logError } from './errorHandler'

// 簡單的加密/解密函數 (生產環境應使用更安全的加密方法)
const ENCRYPTION_KEY = 'one-on-one-secure-key-2024'

const simpleEncrypt = (text) => {
  try {
    return btoa(encodeURIComponent(text + '|' + ENCRYPTION_KEY))
  } catch (error) {
    logError(error, 'Encryption failed')
    return text
  }
}

const simpleDecrypt = (encryptedText) => {
  try {
    const decoded = decodeURIComponent(atob(encryptedText))
    const [text, key] = decoded.split('|')
    if (key !== ENCRYPTION_KEY) {
      throw new Error('Invalid encryption key')
    }
    return text
  } catch (error) {
    logError(error, 'Decryption failed')
    return null
  }
}

// 創建帶有過期時間的存儲項目
const createStorageItem = (value, expiresInMinutes = 60) => {
  const expirationTime = new Date().getTime() + (expiresInMinutes * 60 * 1000)
  return {
    value,
    expiration: expirationTime,
    timestamp: new Date().getTime()
  }
}

// 檢查存儲項目是否過期
const isExpired = (item) => {
  if (!item || !item.expiration) return true
  return new Date().getTime() > item.expiration
}

export const secureStorage = {
  // 設置安全存儲項目
  setItem: (key, value, expiresInMinutes = 60, encrypt = true) => {
    try {
      const storageItem = createStorageItem(value, expiresInMinutes)
      const jsonString = JSON.stringify(storageItem)
      const finalValue = encrypt ? simpleEncrypt(jsonString) : jsonString
      
      localStorage.setItem(`secure_${key}`, finalValue)
      return true
    } catch (error) {
      logError(error, `SecureStorage.setItem - ${key}`)
      return false
    }
  },

  // 獲取安全存儲項目
  getItem: (key, decrypt = true) => {
    try {
      const stored = localStorage.getItem(`secure_${key}`)
      if (!stored) return null

      const jsonString = decrypt ? simpleDecrypt(stored) : stored
      if (!jsonString) return null

      const storageItem = JSON.parse(jsonString)
      
      if (isExpired(storageItem)) {
        secureStorage.removeItem(key)
        return null
      }

      return storageItem.value
    } catch (error) {
      logError(error, `SecureStorage.getItem - ${key}`)
      secureStorage.removeItem(key) // 清除損壞的數據
      return null
    }
  },

  // 移除安全存儲項目
  removeItem: (key) => {
    try {
      localStorage.removeItem(`secure_${key}`)
      return true
    } catch (error) {
      logError(error, `SecureStorage.removeItem - ${key}`)
      return false
    }
  },

  // 清除所有過期項目
  clearExpired: () => {
    try {
      const keys = Object.keys(localStorage)
      const secureKeys = keys.filter(key => key.startsWith('secure_'))
      
      secureKeys.forEach(key => {
        const originalKey = key.replace('secure_', '')
        const value = secureStorage.getItem(originalKey)
        // getItem會自動清除過期項目
      })
      
      return true
    } catch (error) {
      logError(error, 'SecureStorage.clearExpired')
      return false
    }
  },

  // 檢查項目是否存在且未過期
  hasValidItem: (key) => {
    return secureStorage.getItem(key) !== null
  }
}

// 專門用於敏感數據的存儲管理
export const sensitiveDataManager = {
  // 存儲認證token (更短的過期時間)
  setAuthToken: (token) => {
    return secureStorage.setItem('authToken', token, 30, true) // 30分鐘過期
  },

  getAuthToken: () => {
    return secureStorage.getItem('authToken', true)
  },

  removeAuthToken: () => {
    return secureStorage.removeItem('authToken')
  },

  // 存儲用戶資料 (較長的過期時間，但不加密敏感部分)
  setUserData: (userData) => {
    const sanitizedData = {
      ...userData,
      // 移除敏感資訊
      password: undefined,
      creditCard: undefined,
      bankAccount: undefined
    }
    return secureStorage.setItem('userData', sanitizedData, 120, false) // 2小時過期
  },

  getUserData: () => {
    return secureStorage.getItem('userData', false)
  },

  removeUserData: () => {
    return secureStorage.removeItem('userData')
  },

  // 清除所有敏感數據
  clearAllSensitiveData: () => {
    sensitiveDataManager.removeAuthToken()
    sensitiveDataManager.removeUserData()
    secureStorage.removeItem('pendingBooking')
    secureStorage.removeItem('confirmedBooking')
    return true
  }
}

// 定期清理過期數據
if (typeof window !== 'undefined') {
  // 頁面載入時清理一次
  secureStorage.clearExpired()
  
  // 每30分鐘清理一次過期數據
  setInterval(() => {
    secureStorage.clearExpired()
  }, 30 * 60 * 1000)
}