import { createContext, useContext, useState, ReactNode } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { PaymentContextType, PaymentMethod, PaymentData, PaymentMethods } from '../types'

// 開發模式下使用 Mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' || true

const PaymentContext = createContext<PaymentContextType>({
  paymentMethods: [],
  selectedPaymentMethod: null,
  processing: false,
  error: null,
  processPayment: async () => ({ success: false, error: 'Not implemented' }),
  addPaymentMethod: async () => ({ success: false, error: 'Not implemented' }),
  removePaymentMethod: async () => ({ success: false, error: 'Not implemented' }),
  setSelectedPaymentMethod: () => {}
})

export function usePayment(): PaymentContextType {
  return useContext(PaymentContext)
}

interface PaymentProviderProps {
  children: ReactNode
}

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    PaymentMethods.USDT,
    PaymentMethods.CREDIT_CARD,
    PaymentMethods.APPLE_PAY,
    PaymentMethods.GOOGLE_PAY
  ])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null)
  const [processing, setProcessing] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 處理支付
  const processPayment = withErrorHandling(async (bookingId: string, paymentData: PaymentData) => {
    setProcessing(true)
    setError(null)

    if (USE_MOCK_API) {
      // Mock 支付處理
      await new Promise(resolve => setTimeout(resolve, 2000)) // 模擬處理時間
      
      // 模擬成功率 90%
      const isSuccess = Math.random() > 0.1
      
      if (isSuccess) {
        setProcessing(false)
        return { success: true }
      } else {
        setProcessing(false)
        return { success: false, error: '支付處理失敗，請重試' }
      }
    } else {
      const response = await axios.post(`/api/bookings/${bookingId}/payment`, paymentData)
      setProcessing(false)
      return { success: true, data: response.data }
    }
  }, '處理支付')

  // 添加支付方式
  const addPaymentMethod = withErrorHandling(async (method: PaymentMethod) => {
    if (paymentMethods.includes(method)) {
      return { success: false, error: '支付方式已存在' }
    }
    
    setPaymentMethods(prev => [...prev, method])
    return { success: true }
  }, '添加支付方式')

  // 移除支付方式
  const removePaymentMethod = withErrorHandling(async (method: PaymentMethod) => {
    setPaymentMethods(prev => prev.filter(m => m !== method))
    
    if (selectedPaymentMethod === method) {
      setSelectedPaymentMethod(null)
    }
    
    return { success: true }
  }, '移除支付方式')

  const value: PaymentContextType = {
    paymentMethods,
    selectedPaymentMethod,
    processing,
    error,
    processPayment: async (bookingId: string, paymentData: PaymentData) => {
      const result = await processPayment(bookingId, paymentData)
      if (!result.success) {
        setError(result.error || '支付處理失敗')
      }
      return result
    },
    addPaymentMethod: async (method: PaymentMethod) => {
      const result = await addPaymentMethod(method)
      if (!result.success) {
        setError(result.error || '添加支付方式失敗')
      }
      return result
    },
    removePaymentMethod: async (method: PaymentMethod) => {
      const result = await removePaymentMethod(method)
      if (!result.success) {
        setError(result.error || '移除支付方式失敗')
      }
      return result
    },
    setSelectedPaymentMethod
  }

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  )
}