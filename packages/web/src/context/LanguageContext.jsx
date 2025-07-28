import React, { createContext, useContext } from 'react'

const LanguageContext = createContext({})

const translations = {
  // Navigation
  'nav.home': '首頁',
  'nav.guides': '尋找導遊',
  'nav.login': '登入',
  'nav.register': '註冊',
  'nav.dashboard': '儀表板',
  'nav.logout': '登出',
  
  // Common
  'common.loading': '載入中...',
  'common.error': '錯誤',
  'common.success': '成功',
  'common.cancel': '取消',
  'common.confirm': '確認',
  'common.save': '儲存',
  'common.edit': '編輯',
  'common.delete': '刪除',
  
  // Home Page
  'home.title': '找到您的完美導遊',
  'home.subtitle': '與當地專家體驗個人化的一對一旅遊',
  'home.cta': '尋找導遊',
  'home.features.personal': '個人化體驗',
  'home.features.local': '當地專家',
  'home.features.secure': '安全支付',
  
  // Auth
  'auth.login': '登入',
  'auth.register': '註冊',
  'auth.email': '電子郵件',
  'auth.password': '密碼',
  'auth.confirmPassword': '確認密碼',
  'auth.firstName': '名字',
  'auth.lastName': '姓氏',
  'auth.userType': '我是',
  'auth.customer': '顧客',
  'auth.guide': '導遊',
  'auth.googleLogin': '使用 Google 繼續',
  'auth.appleLogin': '使用 Apple 繼續',
  
  // Guides
  'guides.title': '可預約導遊',
  'guides.filter.location': '地點',
  'guides.filter.language': '語言',
  'guides.filter.price': '價格範圍',
  'guides.hourly': '每小時',
  'guides.rating': '評分',
  'guides.book': '立即預約',
  
  // Payment
  'payment.title': '付款',
  'payment.usdt': '使用 USDT 支付',
  'payment.amount': '金額',
  'payment.wallet': '錢包地址',
  'payment.confirm': '確認付款',
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function LanguageProvider({ children }) {
  const t = (key, defaultValue = key) => {
    return translations[key] || defaultValue
  }

  const value = {
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}