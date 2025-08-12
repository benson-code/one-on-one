import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react'
import { withErrorHandling } from '../utils/errorHandler'
import { Notification, NotificationContextType, createDefaultNotification } from '../types'
import { logger } from '../utils/logger'

type NotificationSeverity = 'success' | 'error' | 'info' | 'warning'

interface AppNotification extends Notification {
  severity?: NotificationSeverity
  autoHide?: boolean
  duration?: number
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  loading: false,
  showNotification: () => {},
  hideNotification: () => {},
  markAsRead: async () => {},
  markAllAsRead: async () => {},
  fetchNotifications: async () => {}
})

export function useNotification(): NotificationContextType {
  return useContext(NotificationContext)
}

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<AppNotification[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [realTimeEnabled, _setRealTimeEnabled] = useState<boolean>(false)
  const wsConnection = useRef<WebSocket | null>(null)

  // 初始化通知系統
  useEffect(() => {
    if (realTimeEnabled) {
      connectWebSocket()
    }
    
    return () => {
      disconnectWebSocket()
    }
  }, [realTimeEnabled])

  // WebSocket 連線
  const connectWebSocket = () => {
    if (wsConnection.current) return
    
    const wsUrl = process.env.NODE_ENV === 'production' 
      ? 'wss://api.oneononetour.com/ws/notifications'
      : 'ws://localhost:3001/ws/notifications'
    
    wsConnection.current = new WebSocket(wsUrl)
    
    wsConnection.current.onopen = () => {
      logger.websocket('建立連線')
    }
    
    wsConnection.current.onmessage = (event: MessageEvent) => {
      const notification = JSON.parse(event.data)
      addNotification(notification)
    }
    
    wsConnection.current.onerror = (error: Event) => {
      logger.websocket('連線錯誤', error)
    }
    
    wsConnection.current.onclose = () => {
      logger.websocket('連線關閉')
      wsConnection.current = null
    }
  }

  const disconnectWebSocket = () => {
    if (wsConnection.current) {
      wsConnection.current.close()
      wsConnection.current = null
    }
  }

  // 添加通知
  const addNotification = (notification: Partial<AppNotification>) => {
    const newNotification: AppNotification = {
      ...createDefaultNotification(),
      ...notification,
      id: notification.id || `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }
    
    setNotifications(prev => [newNotification, ...prev])
    
    if (!newNotification.read) {
      setUnreadCount(prev => prev + 1)
    }
    
    // 自動隱藏通知
    if (newNotification.autoHide !== false) {
      setTimeout(() => {
        hideNotification(newNotification.id!)
      }, newNotification.duration || 5000)
    }
  }

  // 顯示通知 (應用級別通知)
  const showNotification = (type: NotificationSeverity, message: string) => {
    const severityMap = {
      success: '✅',
      error: '❌', 
      info: 'ℹ️',
      warning: '⚠️'
    }

    addNotification({
      type: 'system_update',
      title: severityMap[type] + ' ' + type.charAt(0).toUpperCase() + type.slice(1),
      message,
      severity: type,
      autoHide: type !== 'error' // 錯誤通知不自動隱藏
    })
  }

  // 隱藏通知
  const hideNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  // 標記為已讀
  const markAsRead = withErrorHandling(async (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    )
    
    const notification = notifications.find(n => n.id === id)
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
    
    // 在實際應用中，這裡會調用 API 更新服務器狀態
    // await axios.patch(`/api/notifications/${id}/read`)
  }, '標記通知為已讀')

  // 標記所有為已讀
  const markAllAsRead = withErrorHandling(async () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
    setUnreadCount(0)
    
    // 在實際應用中，這裡會調用 API 更新服務器狀態
    // await axios.patch('/api/notifications/mark-all-read')
  }, '標記所有通知為已讀')

  // 獲取通知列表
  const fetchNotifications = withErrorHandling(async (_userId: string) => {
    setLoading(true)
    
    try {
      // 在實際應用中，這裡會調用 API 獲取通知
      // const response = await axios.get(`/api/users/${userId}/notifications`)
      // setNotifications(response.data.notifications)
      // setUnreadCount(response.data.unreadCount)
      
      // Mock 實現
      setTimeout(() => {
        setLoading(false)
      }, 500)
    } catch (error) {
      setLoading(false)
      logger.error('獲取通知失敗', error)
    }
  }, '獲取通知列表')

  // 計算未讀數量
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length
    setUnreadCount(unread)
  }, [notifications])

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    showNotification,
    hideNotification,
    markAsRead: async (id: string) => {
      const result = await markAsRead(id)
      if (!result.success) {
        logger.error('標記通知為已讀失敗', result.error)
      }
    },
    markAllAsRead: async () => {
      const result = await markAllAsRead()
      if (!result.success) {
        logger.error('標記所有通知為已讀失敗', result.error)
      }
    },
    fetchNotifications: async (userId: string) => {
      const result = await fetchNotifications(userId)
      if (!result.success) {
        logger.error('獲取通知列表失敗', result.error)
      }
    }
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}