import { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { 
  Booking, 
  BookingContextType, 
  CreateBookingData, 
  UserType
} from '../types'
import { mockApi } from '../utils/mockApi'

// 開發模式下使用 Mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' || true

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  createBooking: async () => ({ success: false, error: 'Not implemented' }),
  updateBooking: async () => ({ success: false, error: 'Not implemented' }),
  cancelBooking: async () => ({ success: false, error: 'Not implemented' }),
  fetchBookings: async () => {},
  setCurrentBooking: () => {}
})

export function useBooking(): BookingContextType {
  return useContext(BookingContext)
}

interface BookingProviderProps {
  children: ReactNode
}

export function BookingProvider({ children }: BookingProviderProps) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 創建預訂
  const createBooking = withErrorHandling(async (bookingData: CreateBookingData) => {
    setLoading(true)
    setError(null)

    if (USE_MOCK_API) {
      const response = await mockApi.bookings.create(bookingData)
      setBookings(prev => [response, ...prev])
      setCurrentBooking(response)
      setLoading(false)
      return { success: true, booking: response }
    } else {
      const response = await axios.post('/api/bookings', bookingData)
      const booking = response.data.booking
      setBookings(prev => [booking, ...prev])
      setCurrentBooking(booking)
      setLoading(false)
      return { success: true, booking }
    }
  }, '創建預訂')

  // 更新預訂
  const updateBooking = withErrorHandling(async (id: string, updates: Partial<Booking>) => {
    setLoading(true)
    setError(null)

    if (USE_MOCK_API) {
      // Mock 更新實現
      setBookings(prev => 
        prev.map(booking => 
          booking.id === id 
            ? { ...booking, ...updates, updatedAt: new Date().toISOString() }
            : booking
        )
      )
      
      const updatedBooking = bookings.find(b => b.id === id)
      if (updatedBooking && currentBooking?.id === id) {
        setCurrentBooking({ ...updatedBooking, ...updates })
      }
      
      setLoading(false)
      return { success: true, booking: { ...updatedBooking, ...updates } as Booking }
    } else {
      const response = await axios.patch(`/api/bookings/${id}`, updates)
      const booking = response.data.booking
      
      setBookings(prev => 
        prev.map(b => b.id === id ? booking : b)
      )
      
      if (currentBooking?.id === id) {
        setCurrentBooking(booking)
      }
      
      setLoading(false)
      return { success: true, booking }
    }
  }, '更新預訂')

  // 取消預訂
  const cancelBooking = withErrorHandling(async (id: string, reason?: string) => {
    setLoading(true)
    setError(null)

    const cancelData = { 
      status: 'cancelled' as const, 
      ...(reason && { cancellationReason: reason })
    }

    const result = await updateBooking(id, cancelData)
    return result
  }, '取消預訂')

  // 獲取預訂列表
  const fetchBookings = withErrorHandling(async (userId: string, userType: UserType) => {
    setLoading(true)
    setError(null)

    if (USE_MOCK_API) {
      const response = await mockApi.bookings.getByUser(userId, userType)
      setBookings(response)
      setLoading(false)
      return { success: true }
    } else {
      const response = await axios.get(`/api/users/${userId}/bookings`, {
        params: { userType }
      })
      setBookings(response.data.bookings)
      setLoading(false)
      return { success: true }
    }
  }, '獲取預訂列表')

  const value: BookingContextType = {
    bookings,
    currentBooking,
    loading,
    error,
    createBooking: async (bookingData: CreateBookingData) => {
      const result = await createBooking(bookingData)
      if (!result.success) {
        setError(result.error || '創建預訂失敗')
      }
      return result
    },
    updateBooking: async (id: string, updates: Partial<Booking>) => {
      const result = await updateBooking(id, updates)
      if (!result.success) {
        setError(result.error || '更新預訂失敗')
      }
      return result
    },
    cancelBooking: async (id: string, reason?: string) => {
      const result = await cancelBooking(id, reason)
      if (!result.success) {
        setError(result.error || '取消預訂失敗')
      }
      return result
    },
    fetchBookings: async (userId: string, userType: UserType) => {
      const result = await fetchBookings(userId, userType)
      if (!result.success) {
        setError(result.error || '獲取預訂列表失敗')
      }
    },
    setCurrentBooking
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}