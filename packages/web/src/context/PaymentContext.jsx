import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { PaymentStatus, PaymentMethods } from '../types'

const PaymentContext = createContext({})

export function usePayment() {
  return useContext(PaymentContext)
}

export function PaymentProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [currentPayment, setCurrentPayment] = useState(null)
  const [paymentHistory, setPaymentHistory] = useState([])

  // USDT 支付配置
  const USDT_CONFIG = {
    networks: {
      TRC20: {
        name: 'TRC20 (Tron)',
        chainId: 'tron',
        contractAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
        explorerUrl: 'https://tronscan.org/#/transaction/',
        minAmount: 1,
        fee: 1
      },
      ERC20: {
        name: 'ERC20 (Ethereum)',
        chainId: 'ethereum',
        contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        explorerUrl: 'https://etherscan.io/tx/',
        minAmount: 10,
        fee: 15
      },
      BEP20: {
        name: 'BEP20 (BSC)',
        chainId: 'bsc',
        contractAddress: '0x55d398326f99059fF775485246999027B3197955',
        explorerUrl: 'https://bscscan.com/tx/',
        minAmount: 5,
        fee: 2
      }
    },
    defaultNetwork: 'TRC20'
  }

  // 創建支付訂單
  const createPayment = withErrorHandling(async (paymentData) => {
    setLoading(true)
    const response = await axios.post('/api/payments', {
      ...paymentData,
      method: PaymentMethods.USDT,
      status: PaymentStatus.PENDING
    })
    
    const payment = response.data.payment
    setCurrentPayment(payment)
    
    return { success: true, payment }
  }, '創建支付訂單')

  // 獲取支付地址
  const getPaymentAddress = withErrorHandling(async (paymentId, network = 'TRC20') => {
    const response = await axios.get(`/api/payments/${paymentId}/address`, {
      params: { network }
    })
    
    return { success: true, address: response.data.address, qrCode: response.data.qrCode }
  }, '獲取支付地址')

  // 檢查支付狀態
  const checkPaymentStatus = withErrorHandling(async (paymentId) => {
    const response = await axios.get(`/api/payments/${paymentId}/status`)
    
    const payment = response.data.payment
    setCurrentPayment(payment)
    
    return { success: true, payment }
  }, '檢查支付狀態')

  // 驗證交易哈希
  const verifyTransaction = withErrorHandling(async (paymentId, txHash, network) => {
    setLoading(true)
    const response = await axios.post(`/api/payments/${paymentId}/verify`, {
      txHash,
      network
    })
    
    const payment = response.data.payment
    setCurrentPayment(payment)
    
    return { success: true, payment, verified: response.data.verified }
  }, '驗證交易')

  // 取得支付詳情
  const getPaymentById = withErrorHandling(async (paymentId) => {
    const response = await axios.get(`/api/payments/${paymentId}`)
    setCurrentPayment(response.data.payment)
    return { success: true, payment: response.data.payment }
  }, '取得支付詳情')

  // 取得用戶支付歷史
  const getPaymentHistory = withErrorHandling(async (userId, page = 1, limit = 10) => {
    const response = await axios.get(`/api/users/${userId}/payments`, {
      params: { page, limit }
    })
    
    setPaymentHistory(response.data.payments)
    return { success: true, payments: response.data.payments, pagination: response.data.pagination }
  }, '取得支付歷史')

  // 取得導遊收款歷史
  const getGuidePayments = withErrorHandling(async (guideId, page = 1, limit = 10) => {
    const response = await axios.get(`/api/guides/${guideId}/payments`, {
      params: { page, limit }
    })
    
    return { success: true, payments: response.data.payments, pagination: response.data.pagination }
  }, '取得收款歷史')

  // 申請退款
  const requestRefund = withErrorHandling(async (paymentId, reason, refundAmount = null) => {
    const response = await axios.post(`/api/payments/${paymentId}/refund`, {
      reason,
      refundAmount
    })
    
    return { success: true, refund: response.data.refund }
  }, '申請退款')

  // 處理退款
  const processRefund = withErrorHandling(async (refundId, walletAddress, network = 'TRC20') => {
    const response = await axios.post(`/api/refunds/${refundId}/process`, {
      walletAddress,
      network
    })
    
    return { success: true, refund: response.data.refund }
  }, '處理退款')

  // 取得匯率
  const getExchangeRate = withErrorHandling(async (fromCurrency = 'USD', toCurrency = 'USDT') => {
    const response = await axios.get('/api/exchange-rate', {
      params: { from: fromCurrency, to: toCurrency }
    })
    
    return { success: true, rate: response.data.rate, timestamp: response.data.timestamp }
  }, '取得匯率')

  // 計算支付手續費
  const calculateFee = (amount, network = 'TRC20') => {
    const networkConfig = USDT_CONFIG.networks[network]
    if (!networkConfig) return 0
    
    return networkConfig.fee
  }

  // 計算實際支付金額（包含手續費）
  const calculateTotalAmount = (amount, network = 'TRC20') => {
    const fee = calculateFee(amount, network)
    return amount + fee
  }

  // 驗證支付金額
  const validatePaymentAmount = (amount, network = 'TRC20') => {
    const networkConfig = USDT_CONFIG.networks[network]
    if (!networkConfig) return { valid: false, error: '不支援的網路' }
    
    if (amount < networkConfig.minAmount) {
      return { 
        valid: false, 
        error: `最低支付金額為 ${networkConfig.minAmount} USDT` 
      }
    }
    
    return { valid: true }
  }

  // 產生支付二維碼
  const generatePaymentQR = (address, amount, network = 'TRC20') => {
    // 根據不同網路生成相應的支付連結
    let paymentUrl
    
    switch (network) {
      case 'TRC20':
        paymentUrl = `tron:${address}?amount=${amount}&token=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`
        break
      case 'ERC20':
        paymentUrl = `ethereum:${address}?value=${amount * 1e6}&token=0xdAC17F958D2ee523a2206206994597C13D831ec7`
        break
      case 'BEP20':
        paymentUrl = `bnb:${address}?amount=${amount}&token=0x55d398326f99059fF775485246999027B3197955`
        break
      default:
        paymentUrl = address
    }
    
    return paymentUrl
  }

  // 格式化交易哈希連結
  const formatTxLink = (txHash, network = 'TRC20') => {
    const networkConfig = USDT_CONFIG.networks[network]
    if (!networkConfig) return null
    
    return `${networkConfig.explorerUrl}${txHash}`
  }

  // 檢查錢包地址格式
  const validateWalletAddress = (address, network = 'TRC20') => {
    if (!address) return { valid: false, error: '錢包地址不能為空' }
    
    switch (network) {
      case 'TRC20':
        return {
          valid: /^T[A-Za-z1-9]{33}$/.test(address),
          error: 'TRON 地址格式不正確'
        }
      case 'ERC20':
        return {
          valid: /^0x[a-fA-F0-9]{40}$/.test(address),
          error: 'Ethereum 地址格式不正確'
        }
      case 'BEP20':
        return {
          valid: /^0x[a-fA-F0-9]{40}$/.test(address),
          error: 'BSC 地址格式不正確'
        }
      default:
        return { valid: false, error: '不支援的網路' }
    }
  }

  // 取得支付統計
  const getPaymentStats = withErrorHandling(async (userId, userType = 'customer') => {
    const endpoint = userType === 'guide' 
      ? `/api/guides/${userId}/payment-stats`
      : `/api/users/${userId}/payment-stats`
      
    const response = await axios.get(endpoint)
    return { success: true, stats: response.data.stats }
  }, '取得支付統計')

  // 設定自動支付通知
  const setupPaymentNotification = withErrorHandling(async (paymentId, webhook) => {
    const response = await axios.post(`/api/payments/${paymentId}/webhook`, {
      webhook
    })
    
    return { success: true, webhook: response.data.webhook }
  }, '設定支付通知')

  const value = {
    loading,
    currentPayment,
    paymentHistory,
    USDT_CONFIG,
    
    // 支付管理
    createPayment,
    getPaymentById,
    getPaymentAddress,
    checkPaymentStatus,
    verifyTransaction,
    
    // 支付歷史
    getPaymentHistory,
    getGuidePayments,
    getPaymentStats,
    
    // 退款管理
    requestRefund,
    processRefund,
    
    // 匯率和計算
    getExchangeRate,
    calculateFee,
    calculateTotalAmount,
    
    // 驗證工具
    validatePaymentAmount,
    validateWalletAddress,
    
    // 工具函數
    generatePaymentQR,
    formatTxLink,
    setupPaymentNotification,
    
    // 狀態管理
    setLoading,
    setCurrentPayment
  }

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  )
}