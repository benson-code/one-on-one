# ONEonone - 頂級導遊媒合平台

<div align="center">

![ONEonone Logo](./packages/web/src/assets/logo.svg)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/benson-code/one-on-one)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-latest-61dafb.svg)](https://reactnative.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff.svg)](https://vitejs.dev/)

**現代化、專業的一對一導遊媒合平台 - 連接旅客與當地專業導遊**

[🌟 功能特色](#功能特色) • [🚀 快速開始](#快速開始) • [📱 技術架構](#技術架構) • [🔧 開發指南](#開發指南) • [📞 聯繫我們](#聯繫我們)

</div>

---

## 📋 目錄

- [專案概述](#專案概述)
- [功能特色](#功能特色)
- [技術架構](#技術架構)
- [快速開始](#快速開始)
- [開發指南](#開發指南)
- [部署指南](#部署指南)
- [API文件](#api文件)
- [測試](#測試)
- [貢獻指南](#貢獻指南)
- [版本更新](#版本更新)
- [聯繫我們](#聯繫我們)

---

## 📖 專案概述

ONEonone 是一個現代化的導遊媒合平台，致力於為旅客提供個人化的一對一導遊服務。平台採用最新的Web技術棧，提供seamless的跨平台體驗，並整合USDT加密貨幣支付系統。

### 🎯 核心價值

- **個人化體驗**: 一對一專屬導遊服務，量身定制的旅遊體驗
- **當地專業**: 經過驗證的當地導遊，深度了解在地文化
- **安全可靠**: 區塊鏈支付系統，保障交易安全
- **現代科技**: 響應式設計，支援Web和移動端

---

## 🌟 功能特色

### 🏆 核心功能

| 功能模塊 | 描述 | 狀態 |
|---------|------|-----|
| **雙用戶系統** | 旅客與導遊分別註冊，專屬儀表板 | ✅ 完成 |
| **智能搜尋** | 地點、語言、價格、專業領域篩選 | ✅ 完成 |
| **即時預約** | 互動式日曆系統，可用性管理 | ✅ 完成 |
| **USDT支付** | 區塊鏈加密貨幣支付，交易透明 | ✅ 完成 |
| **多語言支援** | 繁體中文、英文介面 | ✅ 完成 |
| **響應式設計** | 完美適配桌面、平板、手機 | ✅ 完成 |

### 🎨 用戶體驗特色

- **🌙 暗色主題**: 現代化深色介面設計
- **📱 手機優先**: 專為移動端優化的導航體驗
- **⚡ 高性能**: Vite構建，極速載入
- **🛡️ 錯誤處理**: 完整的ErrorBoundary保護
- **🔐 安全存儲**: 加密本地存儲，數據安全

### 💰 支付系統

- **USDT支付**: 支援Tron網路USDT交易
- **即時匯率**: 動態USD-USDT匯率轉換  
- **交易透明**: 區塊鏈交易哈希驗證
- **多錢包支援**: 相容主流加密貨幣錢包

---

## 🏗️ 技術架構

### 📦 Monorepo結構

```
one-on-one/
├── packages/
│   ├── web/                    # React Web應用
│   │   ├── src/
│   │   │   ├── components/     # 共用組件
│   │   │   ├── pages/          # 頁面組件
│   │   │   ├── context/        # React Context
│   │   │   ├── utils/          # 工具函數  
│   │   │   └── assets/         # 靜態資源
│   │   ├── dist/               # 構建輸出
│   │   └── package.json
│   ├── mobile/                 # React Native應用
│   │   ├── src/
│   │   ├── android/            # Android配置
│   │   ├── ios/                # iOS配置
│   │   └── package.json
│   └── shared/                 # 共享組件庫
├── docs/                       # 文件
├── scripts/                    # 構建腳本
├── package.json               # 根配置
└── README.md                  # 專案說明
```

### 🛠️ 技術棧

#### Frontend (Web)
- **框架**: React 18.2.0 + TypeScript
- **構建工具**: Vite 4.4.5
- **樣式**: Tailwind CSS 3.3.3
- **路由**: React Router Dom 6.14.0
- **圖標**: Lucide React 0.263.0
- **HTTP**: Axios 1.4.0

#### Frontend (Mobile)  
- **框架**: React Native (最新版)
- **導航**: React Navigation
- **平台**: iOS + Android

#### 開發工具
- **語言**: TypeScript 5.1.6
- **代碼規範**: ESLint + Prettier
- **包管理**: npm workspaces
- **版本控制**: Git

#### 部署與DevOps
- **Web部署**: Vercel / Netlify
- **移動端**: App Store / Google Play
- **CI/CD**: GitHub Actions
- **監控**: 內建錯誤追蹤

---

## 🚀 快速開始

### 📋 系統需求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: 最新版本
- **操作系統**: Windows / macOS / Linux

### ⚡ 安裝步驟

```bash
# 1. 克隆專案
git clone https://github.com/benson-code/one-on-one.git
cd one-on-one

# 2. 安裝依賴
npm install

# 3. 啟動開發服務器
npm run dev

# 4. 或者分別啟動
npm run dev:web     # Web應用 (http://localhost:3000)
npm run dev:mobile  # 移動端應用
```

### 🔧 可用指令

```bash
# 開發
npm run dev                 # 啟動所有應用
npm run dev:web            # 僅啟動Web應用  
npm run dev:mobile         # 僅啟動移動端應用

# 構建
npm run build              # 構建所有包
npm run build:web          # 僅構建Web應用
npm run build:mobile       # 僅構建移動端應用

# 代碼品質
npm run lint               # ESLint檢查
npm run format             # Prettier格式化
npm run test               # 運行測試

# 預覽
npm run preview            # 預覽構建結果
```

---

## 🔧 開發指南

### 📁 專案結構詳解

#### Web應用結構
```
packages/web/src/
├── components/
│   ├── Layout.jsx          # 主要佈局組件
│   └── ErrorBoundary.jsx   # 錯誤邊界組件
├── pages/
│   ├── Home.jsx            # 首頁
│   ├── GuidesList.jsx      # 導遊列表
│   ├── BookingPage.jsx     # 預約頁面
│   └── PaymentPage.jsx     # 支付頁面
├── context/
│   ├── AuthContext.jsx     # 認證上下文
│   └── LanguageContext.jsx # 多語言上下文
├── utils/
│   ├── errorHandler.js     # 錯誤處理
│   └── secureStorage.js    # 安全存儲
└── assets/
    └── logo.svg            # 品牌Logo
```

### 🎨 設計系統

#### 色彩規範
```css
:root {
  --primary-color: #0c92f2;      /* 主要藍色 */
  --background-color: #121212;    /* 背景黑色 */
  --text-primary: #E0E0E0;        /* 主要文字 */
  --text-secondary: #A0A0A0;      /* 次要文字 */
  --accent-color: #1E3A8A;        /* 強調色 */
  --card-background: #1E1E1E;     /* 卡片背景 */
}
```

#### 響應式斷點
```css
/* Tailwind CSS 斷點 */
sm: 640px   /* 小型設備 */
md: 768px   /* 中型設備 */ 
lg: 1024px  /* 大型設備 */
xl: 1280px  /* 超大設備 */
```

### 🔐 安全最佳實踐

1. **數據加密**: 敏感數據使用AES加密存儲
2. **Token管理**: JWT Token 30分鐘自動過期
3. **錯誤處理**: 完整的ErrorBoundary覆蓋
4. **輸入驗證**: 前後端雙重驗證
5. **XSS防護**: 不使用innerHTML或dangerouslySetInnerHTML

---

## 📱 部署指南

### 🌐 Web應用部署

#### Vercel部署 (推薦)
```bash
# 安裝Vercel CLI
npm i -g vercel

# 部署到Vercel
cd packages/web
vercel --prod
```

#### Netlify部署
```bash
# 構建應用
npm run build:web

# 上傳 packages/web/dist 資料夾到Netlify
```

### 📱 移動端應用部署

#### iOS部署
```bash
# 進入移動端目錄
cd packages/mobile

# iOS依賴安裝
cd ios && pod install && cd ..

# 在Xcode中打開並Archive
open ios/OneOnOne.xcworkspace
```

#### Android部署
```bash
# 生成APK
cd android
./gradlew assembleRelease

# APK位置: android/app/build/outputs/apk/release/
```

### 🔧 環境變數配置

#### Web應用 (.env)
```env
VITE_API_URL=https://api.oneonone.app
VITE_USDT_NETWORK=tron
VITE_PAYMENT_GATEWAY_URL=https://payment.oneonone.app
```

#### 移動端應用
```env
API_URL=https://api.oneonone.app
USDT_NETWORK=tron
```

---

## 🧪 測試

### 🔍 測試策略

```bash
# 運行所有測試
npm run test

# 運行特定包的測試
npm run test --workspace=@one-on-one/web

# 測試覆蓋率
npm run test:coverage
```

### ✅ 品質保證檢查清單

- [ ] **編譯檢查**: 所有包成功構建
- [ ] **代碼規範**: ESLint無錯誤警告
- [ ] **類型檢查**: TypeScript類型安全
- [ ] **單元測試**: 核心功能測試覆蓋
- [ ] **整合測試**: API端點測試
- [ ] **E2E測試**: 關鍵用戶流程測試
- [ ] **性能測試**: 載入速度和響應時間
- [ ] **安全測試**: 漏洞掃描和權限驗證

---

## 🤝 貢獻指南

### 📝 開發流程

1. **Fork專案** 到你的GitHub帳號
2. **創建分支** `git checkout -b feature/amazing-feature`
3. **提交更改** `git commit -m 'Add amazing feature'`
4. **推送分支** `git push origin feature/amazing-feature`  
5. **建立Pull Request**

### 📋 代碼規範

- 使用TypeScript進行類型安全開發
- 遵循ESLint配置的代碼風格
- 組件使用PascalCase命名
- 文件使用camelCase命名
- 提交信息使用[約定式提交](https://www.conventionalcommits.org/)

### 🐛 Bug回報

請使用[GitHub Issues](https://github.com/benson-code/one-on-one/issues)回報問題，並包含：

- 問題描述和重現步驟
- 預期行為和實際行為
- 環境信息（瀏覽器、設備等）
- 相關截圖或錯誤日誌

---

## 📈 版本更新

### 🎯 開發路線圖

#### v2.0.0 (計劃中)
- [ ] 進階導遊驗證系統
- [ ] 應用內即時訊息功能
- [ ] 相片分享和遊記文件
- [ ] 進階分析儀表板
- [ ] 多幣種支援 (BTC, ETH)

#### v3.0.0 (未來版本)
- [ ] 虛擬導覽功能
- [ ] 與旅遊平台整合
- [ ] 企業預約系統
- [ ] AI智能推薦系統

### 📝 更新日誌

#### v1.0.0 (當前版本)
- ✅ 基礎平台功能完成
- ✅ USDT支付系統集成
- ✅ 響應式設計實現
- ✅ 多語言支援
- ✅ 錯誤處理和安全性增強

---

## 📊 性能指標

### ⚡ Web應用性能

| 指標 | 數值 | 狀態 |
|------|------|------|
| **First Contentful Paint** | < 1.5s | ✅ 優秀 |
| **Largest Contentful Paint** | < 2.5s | ✅ 優秀 |
| **Cumulative Layout Shift** | < 0.1 | ✅ 優秀 |
| **First Input Delay** | < 100ms | ✅ 優秀 |

### 📦 Bundle大小

```
JavaScript: 280.15 KB → 86.17 KB (gzip壓縮)
CSS:        25.32 KB → 5.07 KB (gzip壓縮)  
SVG Assets: 172.28 KB → 57.27 KB (gzip壓縮)
```

---

## 📞 聯繫我們

### 👥 開發團隊

- **專案負責人**: Benson
- **GitHub**: [@benson-code](https://github.com/benson-code)
- **專案倉庫**: [one-on-one](https://github.com/benson-code/one-on-one)

### 🔗 相關連結

- **官方網站**: https://oneonone.app (即將上線)
- **API文件**: https://docs.oneonone.app
- **問題回報**: [GitHub Issues](https://github.com/benson-code/one-on-one/issues)
- **功能建議**: [GitHub Discussions](https://github.com/benson-code/one-on-one/discussions)

### 📧 聯繫方式

- **技術支援**: support@oneonone.app
- **商業合作**: business@oneonone.app
- **安全問題**: security@oneonone.app

---

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權條款。

```
MIT License

Copyright (c) 2024 ONEonone

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

<div align="center">

**🌟 如果這個專案對你有幫助，請給我們一個Star！ 🌟**

**使用現代技術構建，為卓越旅遊體驗而生** ❤️

[![GitHub stars](https://img.shields.io/github/stars/benson-code/one-on-one?style=social)](https://github.com/benson-code/one-on-one/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/benson-code/one-on-one?style=social)](https://github.com/benson-code/one-on-one/network/members)

---

*最後更新: 2024年7月28日*

</div>