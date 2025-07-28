# 貢獻指南

感謝您對 ONEonone 專案的關注！我們歡迎並感謝所有形式的貢獻。

## 🤝 如何貢獻

### 回報 Bug

如果您發現了 bug，請透過以下步驟回報：

1. 檢查 [Issues](https://github.com/benson-code/one-on-one/issues) 確認問題尚未被回報
2. 建立新的 Issue 並提供以下資訊：
   - Bug 的詳細描述
   - 重現步驟
   - 預期行為 vs 實際行為
   - 環境資訊（瀏覽器、作業系統等）
   - 相關截圖或錯誤訊息

### 建議新功能

1. 檢查現有的 Issues 和 [Discussions](https://github.com/benson-code/one-on-one/discussions)
2. 建立新的 Discussion 說明：
   - 功能描述
   - 使用場景
   - 預期效益

### 提交程式碼

1. Fork 本專案到您的 GitHub 帳號
2. 創建新分支：`git checkout -b feature/amazing-feature`
3. 進行變更並確保符合專案規範
4. 提交變更：`git commit -m 'Add amazing feature'`
5. 推送到您的分支：`git push origin feature/amazing-feature`
6. 建立 Pull Request

## 📋 開發規範

### 程式碼風格

- 使用 TypeScript 進行開發
- 遵循 ESLint 和 Prettier 配置
- 組件使用 PascalCase 命名
- 檔案使用 camelCase 命名
- 函數和變數使用 camelCase 命名

### 提交訊息格式

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

類型說明：
- `feat`: 新功能
- `fix`: 修復 bug
- `docs`: 文件更新
- `style`: 程式碼格式化
- `refactor`: 重構
- `test`: 測試相關
- `chore`: 建置或工具相關

範例：
```
feat(auth): add Google OAuth integration
fix(payment): resolve USDT transaction validation
docs: update API documentation
```

### 分支命名

- `feature/` - 新功能開發
- `fix/` - Bug 修復
- `hotfix/` - 緊急修復
- `docs/` - 文件更新
- `refactor/` - 重構

## 🧪 測試

在提交 PR 前，請確保：

- [ ] 所有現有測試通過
- [ ] 新功能包含適當的測試
- [ ] 程式碼覆蓋率不降低
- [ ] 手動測試核心功能

執行測試：
```bash
npm test
npm run test:coverage
```

## 📦 發布流程

1. 更新版本號（遵循 [Semantic Versioning](https://semver.org/)）
2. 更新 CHANGELOG.md
3. 建立 Release Tag
4. 自動部署到各平台

## 🔍 程式碼審查

所有 PR 都需要經過程式碼審查：

- 確保程式碼品質和安全性
- 驗證功能符合需求
- 檢查測試覆蓋率
- 確認文件完整性

## 📞 需要幫助？

- 💬 加入 [GitHub Discussions](https://github.com/benson-code/one-on-one/discussions)
- 📧 寄信到 support@oneonone.app
- 🐛 回報問題到 [Issues](https://github.com/benson-code/one-on-one/issues)

## 📜 行為準則

參與本專案即表示您同意遵守我們的行為準則：

- 尊重他人，保持友善和專業
- 歡迎不同觀點和經驗
- 專注於對社群最有利的事情
- 展現同理心和包容性

感謝您的貢獻！ 🙏