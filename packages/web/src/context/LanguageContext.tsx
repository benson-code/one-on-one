import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { LanguageContextType, Language, Languages } from '../types'

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'zh-tw',
  translations: {},
  changeLanguage: () => {},
  t: (key: string) => key
})

export function useLanguage(): LanguageContextType {
  return useContext(LanguageContext)
}

interface LanguageProviderProps {
  children: ReactNode
}

// 基礎翻譯字典
const translations: Record<Language, Record<string, string>> = {
  'zh-tw': {
    'welcome': '歡迎',
    'login': '登入',
    'register': '註冊',
    'logout': '登出',
    'dashboard': '儀表板',
    'profile': '個人資料',
    'bookings': '預訂',
    'guides': '導遊',
    'search': '搜尋',
    'cancel': '取消',
    'confirm': '確認',
    'save': '儲存',
    'edit': '編輯',
    'delete': '刪除'
  },
  'en': {
    'welcome': 'Welcome',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'bookings': 'Bookings',
    'guides': 'Guides',
    'search': 'Search',
    'cancel': 'Cancel',
    'confirm': 'Confirm',
    'save': 'Save',
    'edit': 'Edit',
    'delete': 'Delete'
  },
  // 其他語言可以稍後添加
  'zh-cn': {},
  'ja': {},
  'ko': {},
  'es': {},
  'fr': {},
  'de': {},
  'it': {},
  'pt': {},
  'ru': {},
  'ar': {},
  'th': {},
  'vi': {}
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('zh-tw')

  // 從本地存儲加載語言設置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  // 更改語言
  const changeLanguage = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem('preferred-language', language)
  }

  // 翻譯函數
  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[currentLanguage][key] || key
    
    // 替換參數
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value)
      })
    }
    
    return translation
  }

  const value: LanguageContextType = {
    currentLanguage,
    translations: translations[currentLanguage],
    changeLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}