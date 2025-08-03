import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { NotificationTypes, createDefaultNotification } from '../types'

const NotificationContext = createContext({})

export function useNotification() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [realTimeEnabled, setRealTimeEnabled] = useState(false)

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
  let wsConnection = null
  
  const connectWebSocket = () => {
    if (wsConnection) return
    
    const wsUrl = process.env.NODE_ENV === 'production' 
      ? 'wss://api.oneononetour.com/ws/notifications'
      : 'ws://localhost:3001/ws/notifications'
    
    wsConnection = new WebSocket(wsUrl)
    
    wsConnection.onopen = () => {
      console.log('WebSocket 連線已建立')
    }
    
    wsConnection.onmessage = (event) => {
      const notification = JSON.parse(event.data)
      addNotification(notification)
    }
    
    wsConnection.onclose = () => {
      console.log('WebSocket 連線已關閉')
      // 自動重連
      setTimeout(connectWebSocket, 5000)
    }
    
    wsConnection.onerror = (error) => {
      console.error('WebSocket 錯誤:', error)
    }
  }
  
  const disconnectWebSocket = () => {
    if (wsConnection) {
      wsConnection.close()
      wsConnection = null
    }
  }

  // 取得用戶通知
  const getUserNotifications = withErrorHandling(async (userId, page = 1, limit = 20) => {
    setLoading(true)
    const response = await axios.get(`/api/users/${userId}/notifications`, {
      params: { page, limit }
    })
    
    setNotifications(response.data.notifications)
    setUnreadCount(response.data.unreadCount)
    
    return { 
      success: true, 
      notifications: response.data.notifications,
      unreadCount: response.data.unreadCount,
      pagination: response.data.pagination
    }
  }, '取得通知')

  // 創建通知
  const createNotification = withErrorHandling(async (notificationData) => {
    const response = await axios.post('/api/notifications', {
      ...createDefaultNotification(),
      ...notificationData
    })
    
    const notification = response.data.notification
    addNotification(notification)
    
    return { success: true, notification }
  }, '創建通知')

  // 標記通知為已讀
  const markAsRead = withErrorHandling(async (notificationId) => {
    const response = await axios.put(`/api/notifications/${notificationId}/read`)
    
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, read: true }
          : notif
      )
    )
    
    setUnreadCount(prev => Math.max(0, prev - 1))
    
    return { success: true, notification: response.data.notification }
  }, '標記為已讀')

  // 標記所有通知為已讀
  const markAllAsRead = withErrorHandling(async (userId) => {
    const response = await axios.put(`/api/users/${userId}/notifications/read-all`)
    
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
    
    setUnreadCount(0)
    
    return { success: true, count: response.data.count }
  }, '標記全部為已讀')

  // 刪除通知
  const deleteNotification = withErrorHandling(async (notificationId) => {
    await axios.delete(`/api/notifications/${notificationId}`)
    
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    )
    
    return { success: true }
  }, '刪除通知')

  // 清空所有通知
  const clearAllNotifications = withErrorHandling(async (userId) => {
    await axios.delete(`/api/users/${userId}/notifications`)
    
    setNotifications([])
    setUnreadCount(0)
    
    return { success: true }
  }, '清空所有通知')

  // 設定通知偏好
  const updateNotificationSettings = withErrorHandling(async (userId, settings) => {
    const response = await axios.put(`/api/users/${userId}/notification-settings`, settings)
    
    return { success: true, settings: response.data.settings }
  }, '更新通知設定')

  // 取得通知偏好
  const getNotificationSettings = withErrorHandling(async (userId) => {
    const response = await axios.get(`/api/users/${userId}/notification-settings`)
    
    return { success: true, settings: response.data.settings }
  }, '取得通知設定')

  // 發送預訂確認通知
  const sendBookingNotification = withErrorHandling(async (bookingId, type) => {
    const response = await axios.post(`/api/bookings/${bookingId}/notify`, {
      type
    })
    
    return { success: true, notification: response.data.notification }
  }, '發送預訂通知')

  // 發送支付通知
  const sendPaymentNotification = withErrorHandling(async (paymentId, type) => {
    const response = await axios.post(`/api/payments/${paymentId}/notify`, {
      type
    })
    
    return { success: true, notification: response.data.notification }
  }, '發送支付通知')

  // 發送評價通知
  const sendReviewNotification = withErrorHandling(async (reviewId) => {
    const response = await axios.post(`/api/reviews/${reviewId}/notify`)
    
    return { success: true, notification: response.data.notification }
  }, '發送評價通知')

  // 批量創建通知
  const createBulkNotifications = withErrorHandling(async (userIds, notificationData) => {
    const response = await axios.post('/api/notifications/bulk', {
      userIds,
      ...notificationData
    })
    
    return { success: true, count: response.data.count }
  }, '批量創建通知')

  // 取得通知統計
  const getNotificationStats = withErrorHandling(async (userId) => {
    const response = await axios.get(`/api/users/${userId}/notification-stats`)
    
    return { success: true, stats: response.data.stats }
  }, '取得通知統計')

  // 設定推送通知權杖
  const setPushToken = withErrorHandling(async (userId, token, platform = 'web') => {
    const response = await axios.post(`/api/users/${userId}/push-token`, {
      token,
      platform
    })
    
    return { success: true, registered: response.data.registered }
  }, '設定推送權杖')

  // 工具函數：添加新通知到列表
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev])
    
    if (!notification.read) {
      setUnreadCount(prev => prev + 1)
    }
    
    // 顯示瀏覽器通知（如果用戶允許）
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/logo.png',
        tag: notification.id
      })
    }
  }

  // 工具函數：按類型篩選通知
  const filterNotificationsByType = (type) => {
    return notifications.filter(notif => notif.type === type)
  }

  // 工具函數：取得未讀通知
  const getUnreadNotifications = () => {
    return notifications.filter(notif => !notif.read)
  }

  // 工具函數：按日期分組通知
  const groupNotificationsByDate = () => {
    const groups = {}
    
    notifications.forEach(notif => {
      const date = new Date(notif.createdAt).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notif)
    })
    
    return groups
  }

  // 工具函數：請求瀏覽器通知權限
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  }

  // 預定義通知模板
  const notificationTemplates = {
    [NotificationTypes.BOOKING_CONFIRMED]: {
      title: '預訂已確認',
      getMessage: (data) => `您的 ${data.guideName} 導遊服務已確認，日期：${data.date}`
    },
    [NotificationTypes.BOOKING_CANCELLED]: {
      title: '預訂已取消',
      getMessage: (data) => `您的 ${data.guideName} 導遊服務已取消`
    },
    [NotificationTypes.PAYMENT_RECEIVED]: {
      title: '收到付款',
      getMessage: (data) => `您已收到來自 ${data.customerName} 的付款 $${data.amount}`
    },
    [NotificationTypes.REVIEW_RECEIVED]: {
      title: '收到新評價',
      getMessage: (data) => `${data.customerName} 給了您 ${data.rating} 星評價`
    },
    [NotificationTypes.GUIDE_MESSAGE]: {
      title: '導遊訊息',
      getMessage: (data) => `${data.guideName} 向您發送了訊息`
    },
    [NotificationTypes.SYSTEM_UPDATE]: {
      title: '系統更新',
      getMessage: (data) => data.message || '系統有新的更新'
    }
  }

  const value = {
    notifications,
    unreadCount,
    loading,
    realTimeEnabled,
    notificationTemplates,
    
    // 通知管理
    getUserNotifications,
    createNotification,
    deleteNotification,
    clearAllNotifications,
    
    // 讀取狀態
    markAsRead,
    markAllAsRead,
    
    // 設定管理
    updateNotificationSettings,
    getNotificationSettings,
    
    // 特定通知
    sendBookingNotification,
    sendPaymentNotification,
    sendReviewNotification,
    createBulkNotifications,
    
    // 推送通知
    setPushToken,
    requestNotificationPermission,
    
    // 統計
    getNotificationStats,
    
    // 工具函數
    filterNotificationsByType,
    getUnreadNotifications,
    groupNotificationsByDate,
    
    // WebSocket 控制
    setRealTimeEnabled,
    connectWebSocket,
    disconnectWebSocket,
    
    // 狀態管理
    setLoading
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}