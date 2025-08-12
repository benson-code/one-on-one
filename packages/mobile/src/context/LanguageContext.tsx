import React, { createContext, useContext, ReactNode } from 'react';

// Translation structure interface
interface Translations {
  nav: {
    guides: string;
    dashboard: string;
    login: string;
    register: string;
    logout: string;
    becomeGuide: string;
    help: string;
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
    searchPlaceholder: string;
    featuredGuides: string;
    featuredDestinations: string;
  };
  guides: {
    hourly: string;
    book: string;
    viewProfile: string;
  };
  common: {
    loading: string;
    error: string;
    retry: string;
    cancel: string;
    confirm: string;
    save: string;
    edit: string;
    delete: string;
  };
}

// Context value interface
interface LanguageContextValue {
  t: (key: string) => string;
}

// Provider props interface
interface LanguageProviderProps {
  children: ReactNode;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextValue>({
  t: (key: string) => key,
});

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Translation data with proper typing
const translations: Translations = {
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

export function LanguageProvider({ children }: LanguageProviderProps): JSX.Element {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: LanguageContextValue = {
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}