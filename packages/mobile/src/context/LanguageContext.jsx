import React, { createContext, useContext } from 'react';

const LanguageContext = createContext({});

export function useLanguage() {
  return useContext(LanguageContext);
}

const translations = {
  nav: {
    guides: '探索',
    dashboard: '儀表板',
    login: '登入',
    register: '註冊',
    logout: '登出',
    becomeGuide: '成為導遊',
    help: '幫助'
  },
  home: {
    title: '與當地導遊一起探索精彩之地',
    subtitle: '與專業當地導遊聯繫，享受個人化一對一旅遊體驗',
    cta: '尋找您的導遊',
    searchPlaceholder: '您想去哪裡？例如：巴黎、東京或紐約',
    featuredGuides: '精選導遊',
    featuredDestinations: '熱門目的地'
  },
  guides: {
    hourly: '/小時',
    book: '立即預約',
    viewProfile: '查看檔案'
  },
  common: {
    loading: '載入中...',
    error: '發生錯誤',
    retry: '重試',
    cancel: '取消',
    confirm: '確認',
    save: '儲存',
    edit: '編輯',
    delete: '刪除'
  }
};

export function LanguageProvider({ children }) {
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const value = {
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}