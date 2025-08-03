# ONEonone - 一對一醫療旅遊 AI 平台

<div align="center">

![ONEonone Logo](./packages/web/src/assets/logo.svg)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/benson-code/one-on-one)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)](https://reactjs.org/)
[![React Native](https://img.shields.io/badge/React%20Native-latest-61dafb.svg)](https://reactnative.dev/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-646cff.svg)](https://vitejs.dev/)

**AI 驅動的醫療旅遊平台 - 您的全球健康夥伴**

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

ONEonone 是一個 AI 驅動的醫療旅遊平台，致力於為全球患者提供個人化、智慧化、安全的醫療旅遊解決方案。結合尖端的 AI 技術和新加坡領先的醫療旅遊生態，我們為您打造一站式平台，涵蓋醫療診斷、行程規劃、預約管理和支付服務。

### 🎯 核心價值

- **AI 智慧推薦**: 利用先進 AI 技術，精準匹配最適合的醫療機構和行程
- **全球醫療網絡**: 連接全球 250+ 頂尖醫療機構，覆蓋亞洲、歐洲、北美
- **一站式服務**: 從醫療診斷到旅遊安排，提供完整解決方案
- **安全保障**: 遵循 HIPAA 和 GDPR 標準，確保數據安全和隱私保護

---

## 🌟 功能特色

### 🏆 核心功能

| 功能模塊 | 描述 | 狀態 |
|---------|------|-----|
| **AI 醫療推薦** | 智慧匹配最適合的醫療機構和專科醫師 | ✅ 完成 |
| **醫療顧問系統** | 專業醫療顧問註冊與認證，提供諮詢服務 | ✅ 完成 |
| **智能預約管理** | 互動式預約系統，整合醫療機構時程 | ✅ 完成 |
| **安全支付系統** | 多重加密支付，支援國際醫療費用結算 | ✅ 完成 |
| **多語言支援** | 繁體中文、英文介面，支援醫療術語翻譯 | ✅ 完成 |
| **跨平台應用** | 完美適配桌面、平板、手機，隨時諮詢 | ✅ 完成 |

### 🎨 用戶體驗特色

- **🌙 暗色主題**: 現代化深色介面設計
- **📱 手機優先**: 專為移動端優化的導航體驗
- **⚡ 高性能**: Vite構建，極速載入
- **🛡️ 錯誤處理**: 完整的ErrorBoundary保護
- **🔐 安全存儲**: 加密本地存儲，數據安全

### 🏥 醫療特色功能

- **AI 診斷輔助**: 初步健康評估和醫療建議
- **專科醫師匹配**: 根據病症智慧推薦專業醫師
- **醫療行程規劃**: 整合治療、住宿、交通的完整方案
- **健康數據管理**: 安全儲存和追蹤醫療記錄
- **24/7 緊急支援**: 全天候醫療緊急聯絡服務

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

#### Frontend (Web) - 醫療平台前端
- **框架**: React 18.2.0 + TypeScript
- **構建工具**: Vite 4.4.5 (快速開發與部署)
- **UI 設計**: Tailwind CSS 3.3.3 (醫療級介面設計)
- **路由管理**: React Router Dom 6.14.0
- **圖標系統**: Lucide React 0.263.0 (醫療專用圖標)
- **API 通訊**: Axios 1.4.0 (安全 HTTPS 傳輸)
- **Mock API**: 完整開發用 Mock 系統

#### Frontend (Mobile)  
- **框架**: React Native (最新版)
- **導航**: React Navigation
- **平台**: iOS + Android

#### 開發工具與安全
- **語言**: TypeScript 5.1.6 (類型安全)
- **代碼品質**: ESLint + Prettier
- **包管理**: npm workspaces (Monorepo 架構)
- **版本控制**: Git + GitHub (安全協作)
- **數據安全**: 加密儲存與傳輸
- **進入控制**: JWT Token 認證系統

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
# 開發模式
npm run dev                 # 啟動所有醫療平台應用
npm run dev:web            # 僅啟動醫療平台 Web 版
npm run dev:mobile         # 僅啟動醫療平台手機版

# 構建生產版本
npm run build              # 構建所有平台版本
npm run build:web          # 僅構建 Web 版本
npm run build:mobile       # 僅構建手機版本

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
│   ├── About.jsx           # 關於醫療旅遊平台
│   ├── BookingPage.jsx     # 醫療預約頁面
│   └── PaymentPage.jsx     # 醫療費用支付頁面
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
VITE_MEDICAL_API_URL=https://medical.oneonone.app
VITE_PAYMENT_GATEWAY_URL=https://payment.oneonone.app
VITE_AI_SERVICE_URL=https://ai.oneonone.app
VITE_ENCRYPTION_KEY=your_encryption_key_here
```

#### 移動端應用
```env
API_URL=https://api.oneonone.app
MEDICAL_API_URL=https://medical.oneonone.app
AI_SERVICE_URL=https://ai.oneonone.app
ENCRYPTION_KEY=your_encryption_key_here
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
- [ ] 進階醫師認證與驗證系統
- [ ] 患者與醫師即時通訊功能
- [ ] 醫療報告分享和病歷管理
- [ ] 健康數據分析儀表板
- [ ] 多幣種支援 (BTC, ETH, 信用卡)

#### v3.0.0 (未來版本)
- [ ] 虛擬醫療諮詢功能
- [ ] 與全球醫療機構深度整合
- [ ] 企業健康管理系統
- [ ] AI 智能健康風險評估

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

- **醫療諮詢**: medical@oneonone.app
- **技術支援**: support@oneonone.app
- **商業合作**: business@oneonone.app
- **醫療機構合作**: partners@oneonone.app
- **緊急支援**: emergency@oneonone.app
- **隱私與安全**: privacy@oneonone.app

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

**使用現代 AI 技術構建，為安全醫療旅遊體驗而生** ❤️

[![GitHub stars](https://img.shields.io/github/stars/benson-code/one-on-one?style=social)](https://github.com/benson-code/one-on-one/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/benson-code/one-on-one?style=social)](https://github.com/benson-code/one-on-one/network/members)

---

*最後更新: 2024年7月28日*

</div>