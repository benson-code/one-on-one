// 生產環境安全日誌管理系統
export type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogEntry {
  timestamp: string
  level: string
  message: string
  data?: any
}

class Logger {
  private isDevelopment: boolean
  private logLevel: LogLevel

  constructor() {
    this.isDevelopment = import.meta.env.DEV
    this.logLevel = (import.meta.env.VITE_LOG_LEVEL as LogLevel) || 'warn'
  }

  // 私有方法：檢查是否應該記錄
  private shouldLog(level: LogLevel): boolean {
    if (this.isDevelopment) return true
    
    const levels: Record<LogLevel, number> = { error: 0, warn: 1, info: 2, debug: 3 }
    return levels[level] <= levels[this.logLevel]
  }

  // 私有方法：格式化日誌
  private formatMessage(level: LogLevel, message: string, data: any = null): LogEntry {
    const timestamp = new Date().toISOString()
    const logEntry: LogEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...(data && { data })
    }
    
    return logEntry
  }

  // 私有方法：發送到日誌服務
  private async sendToLogService(logEntry: LogEntry): Promise<void> {
    if (this.isDevelopment) return
    
    try {
      // 生產環境發送到日誌服務 (如 Sentry, LogRocket 等)
      const logServiceUrl = import.meta.env.VITE_LOG_SERVICE_URL
      if (logServiceUrl) {
        await fetch(logServiceUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(logEntry)
        })
      }
    } catch (error) {
      // 靜默失敗，避免日誌記錄影響用戶體驗
    }
  }

  // 錯誤日誌 (生產環境保留)
  error(message: string, data: any = null): void {
    if (this.shouldLog('error')) {
      const logEntry = this.formatMessage('error', message, data)
      
      if (this.isDevelopment) {
        console.error(`🔴 [${logEntry.timestamp}] ${message}`, data)
      } else {
        this.sendToLogService(logEntry)
      }
    }
  }

  // 警告日誌 (生產環境保留)
  warn(message: string, data: any = null): void {
    if (this.shouldLog('warn')) {
      const logEntry = this.formatMessage('warn', message, data)
      
      if (this.isDevelopment) {
        console.warn(`🟡 [${logEntry.timestamp}] ${message}`, data)
      } else {
        this.sendToLogService(logEntry)
      }
    }
  }

  // 資訊日誌 (僅開發環境)
  info(message: string, data: any = null): void {
    if (this.shouldLog('info') && this.isDevelopment) {
      console.info(`🔵 [${new Date().toISOString()}] ${message}`, data)
    }
  }

  // 除錯日誌 (僅開發環境)
  debug(message: string, data: any = null): void {
    if (this.shouldLog('debug') && this.isDevelopment) {
      console.debug(`⚪ [${new Date().toISOString()}] ${message}`, data)
    }
  }

  // WebSocket 連線日誌
  websocket(action: string, data: any = null): void {
    const message = `WebSocket ${action}`
    
    if (this.isDevelopment) {
      console.log(`🔗 [${new Date().toISOString()}] ${message}`, data)
    } else if (action === 'error') {
      this.error(`WebSocket 連線錯誤`, data)
    }
  }

  // 醫療操作日誌 (符合 HIPAA 合規)
  medical(action: string, patientId: string | null = null, details: any = null): void {
    // 在生產環境中，敏感醫療資料不應包含個人識別資訊
    const sanitizedLog = {
      action,
      patientId: patientId ? `***${patientId.slice(-4)}` : null,
      timestamp: new Date().toISOString(),
      ...(details && { details })
    }

    if (this.isDevelopment) {
      console.log(`🏥 醫療操作: ${action}`, sanitizedLog)
    } else {
      this.sendToLogService(this.formatMessage('info', `醫療操作: ${action}`, sanitizedLog))
    }
  }
}

// 單例模式
export const logger = new Logger()

// 便捷導出
export default logger