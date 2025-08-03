import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { createDefaultBooking, BookingStatus, PaymentStatus } from '../types'

const BookingContext = createContext({})

export function useBooking() {
  return useContext(BookingContext)
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [currentBooking, setCurrentBooking] = useState(null)
  const [loading, setLoading] = useState(false)

  // 建立新預訂
  const createBooking = withErrorHandling(async (bookingData) => {
    setLoading(true)
    const response = await axios.post('/api/bookings', {
      ...createDefaultBooking(),
      ...bookingData
    })
    
    const newBooking = response.data.booking
    setBookings(prev => [newBooking, ...prev])
    setCurrentBooking(newBooking)
    
    return { success: true, booking: newBooking }
  }, '建立預訂')

  // 取得用戶的所有預訂
  const getUserBookings = withErrorHandling(async (userId, status = null) => {
    setLoading(true)
    const params = status ? { status } : {}
    const response = await axios.get(`/api/users/${userId}/bookings`, { params })
    setBookings(response.data.bookings)
    return { success: true, bookings: response.data.bookings }
  }, '取得預訂列表')

  // 取得導遊的所有預訂
  const getGuideBookings = withErrorHandling(async (guideId, status = null) => {
    setLoading(true)
    const params = status ? { status } : {}
    const response = await axios.get(`/api/guides/${guideId}/bookings`, { params })
    setBookings(response.data.bookings)
    return { success: true, bookings: response.data.bookings }
  }, '取得導遊預訂')

  // 取得預訂詳情
  const getBookingById = withErrorHandling(async (bookingId) => {
    const response = await axios.get(`/api/bookings/${bookingId}`)
    setCurrentBooking(response.data.booking)
    return { success: true, booking: response.data.booking }
  }, '取得預訂詳情')

  // 確認預訂（導遊使用）
  const confirmBooking = withErrorHandling(async (bookingId, guideNotes = '') => {
    const response = await axios.put(`/api/bookings/${bookingId}/confirm`, {
      guideNotes
    })
    
    const updatedBooking = response.data.booking
    updateBookingInList(updatedBooking)
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking(updatedBooking)
    }
    
    return { success: true, booking: updatedBooking }
  }, '確認預訂')

  // 取消預訂
  const cancelBooking = withErrorHandling(async (bookingId, reason = '', cancelledBy = 'customer') => {
    const response = await axios.put(`/api/bookings/${bookingId}/cancel`, {
      reason,
      cancelledBy
    })
    
    const updatedBooking = response.data.booking
    updateBookingInList(updatedBooking)
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking(updatedBooking)
    }
    
    return { success: true, booking: updatedBooking }
  }, '取消預訂')

  // 修改預訂
  const modifyBooking = withErrorHandling(async (bookingId, modifications) => {
    const response = await axios.put(`/api/bookings/${bookingId}`, modifications)
    
    const updatedBooking = response.data.booking
    updateBookingInList(updatedBooking)
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking(updatedBooking)
    }
    
    return { success: true, booking: updatedBooking }
  }, '修改預訂')

  // 標記預訂為進行中
  const startBooking = withErrorHandling(async (bookingId) => {
    const response = await axios.put(`/api/bookings/${bookingId}/start`)
    
    const updatedBooking = response.data.booking
    updateBookingInList(updatedBooking)
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking(updatedBooking)
    }
    
    return { success: true, booking: updatedBooking }
  }, '開始服務')

  // 完成預訂
  const completeBooking = withErrorHandling(async (bookingId, completionNotes = '') => {
    const response = await axios.put(`/api/bookings/${bookingId}/complete`, {
      completionNotes
    })
    
    const updatedBooking = response.data.booking
    updateBookingInList(updatedBooking)
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking(updatedBooking)
    }
    
    return { success: true, booking: updatedBooking }
  }, '完成服務')

  // 檢查預訂可用性
  const checkAvailability = withErrorHandling(async (guideId, date, time, duration) => {
    const response = await axios.post('/api/bookings/check-availability', {
      guideId,
      date,
      time,
      duration
    })
    
    return { success: true, available: response.data.available }
  }, '檢查可用性')

  // 取得預訂統計
  const getBookingStats = withErrorHandling(async (userId, userType = 'customer') => {
    const endpoint = userType === 'guide' 
      ? `/api/guides/${userId}/booking-stats`
      : `/api/users/${userId}/booking-stats`
      
    const response = await axios.get(endpoint)
    return { success: true, stats: response.data.stats }
  }, '取得預訂統計')

  // 搜尋預訂
  const searchBookings = withErrorHandling(async (filters) => {
    setLoading(true)
    const response = await axios.get('/api/bookings/search', {
      params: filters
    })
    setBookings(response.data.bookings)
    return { success: true, bookings: response.data.bookings }
  }, '搜尋預訂')

  // 取得即將到來的預訂
  const getUpcomingBookings = withErrorHandling(async (userId, userType = 'customer', limit = 5) => {
    const endpoint = userType === 'guide' 
      ? `/api/guides/${userId}/bookings/upcoming`
      : `/api/users/${userId}/bookings/upcoming`
      
    const response = await axios.get(endpoint, {
      params: { limit }
    })
    
    return { success: true, bookings: response.data.bookings }
  }, '取得即將到來的預訂')

  // 取得歷史預訂
  const getBookingHistory = withErrorHandling(async (userId, userType = 'customer', page = 1, limit = 10) => {
    const endpoint = userType === 'guide' 
      ? `/api/guides/${userId}/bookings/history`
      : `/api/users/${userId}/bookings/history`
      
    const response = await axios.get(endpoint, {
      params: { page, limit }
    })
    
    return { success: true, bookings: response.data.bookings, pagination: response.data.pagination }
  }, '取得歷史預訂')

  // 申請退款
  const requestRefund = withErrorHandling(async (bookingId, reason, amount = null) => {
    const response = await axios.post(`/api/bookings/${bookingId}/refund`, {
      reason,
      amount
    })
    
    return { success: true, refund: response.data.refund }
  }, '申請退款')

  // 處理退款（管理員使用）
  const processRefund = withErrorHandling(async (refundId, approved, adminNotes = '') => {
    const response = await axios.put(`/api/refunds/${refundId}/process`, {
      approved,
      adminNotes
    })
    
    return { success: true, refund: response.data.refund }
  }, '處理退款')

  // 添加客戶備註
  const addCustomerNotes = withErrorHandling(async (bookingId, notes) => {
    const response = await axios.put(`/api/bookings/${bookingId}/customer-notes`, {
      notes
    })
    
    const updatedBooking = response.data.booking
    updateBookingInList(updatedBooking)
    
    if (currentBooking && currentBooking.id === bookingId) {
      setCurrentBooking(updatedBooking)
    }
    
    return { success: true, booking: updatedBooking }
  }, '添加客戶備註')

  // 工具函數：更新列表中的預訂
  const updateBookingInList = (updatedBooking) => {
    setBookings(prev => prev.map(booking => 
      booking.id === updatedBooking.id ? updatedBooking : booking
    ))
  }

  // 工具函數：按狀態篩選預訂
  const filterBookingsByStatus = (status) => {
    return bookings.filter(booking => booking.status === status)
  }

  // 工具函數：取得預訂狀態計數
  const getBookingStatusCounts = () => {
    return bookings.reduce((counts, booking) => {
      counts[booking.status] = (counts[booking.status] || 0) + 1
      return counts
    }, {})
  }

  const value = {
    bookings,
    currentBooking,
    loading,
    
    // 預訂管理
    createBooking,
    getUserBookings,
    getGuideBookings,
    getBookingById,
    modifyBooking,
    
    // 預訂狀態管理
    confirmBooking,
    cancelBooking,
    startBooking,
    completeBooking,
    
    // 可用性和搜尋
    checkAvailability,
    searchBookings,
    
    // 預訂查詢
    getUpcomingBookings,
    getBookingHistory,
    getBookingStats,
    
    // 退款管理
    requestRefund,
    processRefund,
    
    // 備註管理
    addCustomerNotes,
    
    // 工具函數
    filterBookingsByStatus,
    getBookingStatusCounts,
    setLoading,
    setCurrentBooking
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}