# ONEonone 醫療旅遊AI平台 - 專案上下文檔案

## 🎯 專案概述

**ONEonone** 是一個現代化的一對一醫療旅遊AI平台，致力於為全球患者提供個人化、智慧化、安全的醫療旅遊解決方案。

### 核心業務模式
- **醫療旅遊平台**: 連接患者與全球頂尖醫療機構
- **AI智能推薦**: 精準匹配醫療需求與專業醫師
- **一站式服務**: 醫療診斷 + 旅遊安排 + 支付管理
- **多語言支援**: 繁體中文、英文醫療術語翻譯

---

## 🏗️ 技術架構

### 專案結構 (Monorepo)
```
one-on-one/
├── packages/
│   ├── web/                 # React Web應用 (主要平台)
│   ├── mobile/              # React Native手機應用
│   └── shared/              # 共享組件庫
├── node_modules/            # 依賴包
├── package.json            # 根配置 (npm workspaces)
├── README.md               # 詳細專案文檔
└── CLAUDE.md              # 本檔案 (AI助手專用)
```

### 技術棧概覽
#### Frontend (Web) - 核心平台
- **框架**: React 18.2.0 + JSX
- **構建工具**: Vite 4.4.5 (快速開發)
- **樣式系統**: Tailwind CSS 3.3.3 + 自定義CSS變量
- **路由**: React Router Dom 6.14.0
- **圖標**: Lucide React 0.263.0
- **HTTP客戶端**: Axios 1.4.0
- **開發模式**: Mock API系統

#### Frontend (Mobile)
- **框架**: React Native 0.73.0
- **導航**: React Navigation 6.x
- **原生功能**: AsyncStorage, Gesture Handler, Reanimated
- **平台**: iOS + Android 雙平台支援

#### 開發工具鏈
- **語言**: TypeScript 5.1.6 (類型安全)
- **代碼品質**: ESLint + Prettier
- **測試**: Vitest (Web) + Jest (Mobile)
- **包管理**: npm workspaces
- **版本控制**: Git

---

## 🗂️ 檔案結構詳解

### Web應用 (`packages/web/`)
```
src/
├── components/             # 共用UI組件
│   ├── Layout.jsx         # 主佈局組件 (導航、認證狀態)
│   └── ErrorBoundary.jsx  # 錯誤邊界保護
├── pages/                 # 頁面組件
│   ├── Home.jsx          # 首頁 (Landing Page)
│   ├── Login.jsx         # 用戶登入 (客戶/醫師)
│   ├── Register.jsx      # 用戶註冊
│   ├── About.jsx         # 關於醫療旅遊
│   ├── CustomerDashboard.jsx  # 客戶儀表板
│   ├── GuideDashboard.jsx    # 醫師儀表板
│   ├── GuidesList.jsx    # 醫師列表瀏覽
│   ├── BookingPage.jsx   # 預約頁面
│   └── PaymentPage.jsx   # 支付頁面
├── context/              # React Context狀態管理
│   ├── AuthContext.jsx   # 認證狀態 (用戶登入/登出)
│   ├── LanguageContext.jsx  # 多語言切換
│   ├── GuideContext.jsx  # 醫師資料管理
│   ├── BookingContext.jsx    # 預約管理
│   ├── PaymentContext.jsx    # 支付管理
│   └── NotificationContext.jsx  # 通知系統
├── utils/                # 工具函數
│   ├── api.js           # API呼叫封裝
│   ├── mockApi.js       # Mock API (開發用)
│   ├── errorHandler.js  # 統一錯誤處理
│   └── secureStorage.js # 安全本地存儲
├── types/                # 類型定義
│   └── index.js         # 統一類型管理
├── assets/              # 靜態資源
│   └── logo.svg        # 品牌Logo
├── hooks/               # 自定義React Hooks
├── index.css           # 全局樣式
└── main.jsx            # 應用入口點
```

### Mobile應用 (`packages/mobile/`)
```
src/
├── components/          # 移動端UI組件
├── pages/              # 移動端頁面
├── navigation/         # 導航配置
├── context/           # 共享狀態管理
└── styles/            # 樣式定義
android/               # Android原生配置
ios/                   # iOS原生配置
```

---

## 🔐 認證與權限系統

### 用戶類型
- **customer**: 患者/客戶 (尋求醫療服務)
- **guide**: 醫療顧問/醫師 (提供醫療服務)

### 認證流程
1. **登入**: Email + Password + 用戶類型選擇
2. **Token管理**: JWT Token (30分鐘有效期)
3. **權限控制**: 基於用戶類型的路由保護
4. **安全存儲**: 加密本地存儲敏感資料

### 路由權限
- `/customer/dashboard` - 客戶專用儀表板
- `/guide/dashboard` - 醫師專用儀表板
- 自動根據 `user.userType` 重定向

---

## 📊 資料模型

### 用戶資料結構
```javascript
User {
  id: string,           // 唯一識別碼
  firstName: string,    // 名字
  lastName: string,     // 姓氏
  email: string,        // 電子郵件
  userType: 'customer'|'guide',  // 用戶類型
  avatar: string,       // 頭像URL
  createdAt: string,    // 建立時間
  // 其他擴展欄位...
}
```

### 預約資料結構
```javascript
Booking {
  id: string,                    // 預約ID
  guide: GuideInfo,             // 醫師資訊
  customer: CustomerInfo,       // 客戶資訊
  date: string,                 // 預約日期
  time: string,                 // 預約時間
  duration: number,             // 持續時間(小時)
  price: number,                // 費用
  status: BookingStatus,        // 預約狀態
  paymentStatus: PaymentStatus, // 支付狀態
  location: string,             // 地點
  // 醫療相關欄位...
}
```

### 狀態枚舉
```javascript
BookingStatus = {
  'pending'     // 待確認
  'confirmed'   // 已確認
  'completed'   // 已完成
  'cancelled'   // 已取消
}

PaymentStatus = {
  'pending'     // 待支付
  'completed'   // 已支付
  'failed'      // 支付失敗
  'refunded'    // 已退款
}
```

---

## 🎨 設計系統

### CSS變量系統 (Dark Theme)
```css
:root {
  --primary-color: #0c92f2;      /* 主要藍色 (醫療信任色) */
  --background-color: #121212;    /* 深色背景 */
  --card-background: #1E1E1E;     /* 卡片背景 */
  --text-primary: #E0E0E0;        /* 主文字 (高對比) */
  --text-secondary: #A0A0A0;      /* 次要文字 */
  --accent-color: #1E3A8A;        /* 強調色 */
}
```

### Tailwind配置要點
- **響應式**: 移動優先設計 (sm: 640px, md: 768px, lg: 1024px)
- **組件化**: 使用Tailwind utility classes
- **深色主題**: 預設深色模式醫療專業介面

### UI組件規範
- **按鈕**: `btn-primary` (主要操作), `btn-secondary` (次要操作)
- **卡片**: `card` class提供統一陰影與圓角
- **表單**: 統一的input樣式與驗證狀態
- **導航**: 響應式導航選單 (桌面+移動端)

---

## 🔧 開發指南

### 常用開發指令
```bash
# 安裝依賴
npm install

# 開發模式 (同時啟動Web+Mobile)
npm run dev

# 單獨啟動Web平台
npm run dev:web          # → http://localhost:3000

# 單獨啟動Mobile應用
npm run dev:mobile

# 生產構建
npm run build            # 構建所有平台
npm run build:web       # 僅構建Web
npm run build:mobile    # 僅構建Mobile

# 代碼品質
npm run lint            # ESLint檢查
npm run format          # Prettier格式化
npm run test            # 運行測試
```

### Mock API開發
- **位置**: `packages/web/src/utils/mockApi.js`
- **啟用**: `NODE_ENV === 'development'` 時自動使用
- **測試用戶**:
  - Customer: `john@example.com` / `password123`
  - Guide: `jane@example.com` / `password123`

### 錯誤處理機制
1. **ErrorBoundary**: React錯誤邊界保護
2. **withErrorHandling**: 統一async/await錯誤處理
3. **safeLocalStorage**: 安全的本地存儲操作
4. **logError**: 統一錯誤日誌記錄

---

## 🚀 部署資訊

### Web應用部署
- **推薦平台**: Vercel (零配置部署)
- **替代方案**: Netlify, AWS S3 + CloudFront
- **構建輸出**: `packages/web/dist/`
- **環境變數**: Vite使用 `VITE_` 前綴

### Mobile應用部署
- **iOS**: Xcode Archive → App Store Connect
- **Android**: `./gradlew assembleRelease` → Google Play Console
- **原生依賴**: iOS需要 `pod install`

### 效能監控
- **Bundle大小**: ~280KB JS (gzip: ~86KB)
- **首次載入**: < 1.5s (優秀評級)
- **SEO**: 單頁應用 (需要考慮預渲染)

---

## 🛡️ 安全最佳實踐

### 資料保護
- **敏感資料加密**: AES加密本地存儲
- **Token管理**: JWT 30分鐘自動過期
- **API安全**: HTTPS強制 + CORS配置
- **輸入驗證**: 前後端雙重驗證

### 醫療數據合規
- **HIPAA合規**: 健康資訊保護法案
- **GDPR合規**: 歐盟通用資料保護規範
- **數據匿名化**: 敏感醫療資訊脫敏處理
- **審計日誌**: 關鍵操作記錄追蹤

---

## 🎯 開發重點

### 目前專案狀態
- ✅ **基礎架構完成**: Monorepo設置、構建系統
- ✅ **認證系統**: 用戶登入/註冊、權限控制
- ✅ **UI框架**: 響應式設計、深色主題
- ✅ **路由系統**: SPA路由、權限保護
- ✅ **狀態管理**: React Context API
- ✅ **Mock API**: 完整開發環境

### 關鍵功能模塊
1. **用戶管理**: 雙重身份(患者/醫師)認證系統
2. **預約系統**: 醫療預約流程管理
3. **支付系統**: 國際醫療費用結算
4. **通訊系統**: 患者-醫師溝通平台
5. **AI推薦**: 智能醫療匹配算法

### 開發注意事項
- **多語言**: 繁中/英文切換 (醫療術語準確性)
- **響應式**: 移動優先設計理念
- **效能**: Bundle大小控制、lazy loading
- **測試**: 關鍵流程單元測試覆蓋
- **醫療合規**: 數據安全與隱私保護

---

## 📞 技術支援

### 專案維護
- **主要開發者**: Benson (@benson-code)
- **技術棧**: React + TypeScript + Tailwind
- **開發環境**: Node.js 18+ + npm workspaces
- **版本控制**: Git + GitHub

### 故障排除
1. **編譯錯誤**: 檢查Node.js版本 (>=18.0.0)
2. **依賴衝突**: 刪除node_modules後重新安裝
3. **Mock API**: 確認開發模式正確啟用
4. **路由問題**: 檢查React Router配置
5. **樣式問題**: 確認Tailwind CSS正確載入

---

## 🎯 AI助手使用指南

### 常見開發任務
1. **新增頁面**: 創建在 `packages/web/src/pages/`
2. **新增組件**: 創建在 `packages/web/src/components/`
3. **修改路由**: 編輯 `packages/web/src/App.jsx`
4. **狀態管理**: 使用或擴展existing Context
5. **樣式調整**: 使用Tailwind classes或CSS變量

### 代碼規範提醒
- 使用**JSX**文件格式 (非TSX)
- 遵循**React Hooks**模式
- 使用**Tailwind CSS**而非inline styles
- 採用**函數式組件**而非class components
- 保持**響應式設計**原則

### 測試與驗證
- 每次修改後運行 `npm run build` 確認編譯
- 使用 `npm run dev:web` 本地測試
- 確認移動端響應式設計
- 驗證不同用戶類型的功能訪問

---

*最後更新: 2025-08-03*
*專案版本: v1.0.0*