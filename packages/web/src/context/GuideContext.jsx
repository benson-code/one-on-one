import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { createDefaultGuide, ServiceTypes, Languages } from '../types'
import { mockApi } from '../utils/mockApi'

// 開發模式下使用 Mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' || true

const GuideContext = createContext({})

export function useGuide() {
  return useContext(GuideContext)
}

export function GuideProvider({ children }) {
  const [guides, setGuides] = useState([])
  const [currentGuide, setCurrentGuide] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    language: '',
    priceRange: '',
    rating: '',
    serviceType: '',
    availability: ''
  })

  // 搜尋導遊
  const searchGuides = withErrorHandling(async (filters = {}) => {
    setLoading(true)
    
    if (USE_MOCK_API) {
      const response = await mockApi.guides.list({ ...searchFilters, ...filters })
      setGuides(response.guides)
      setLoading(false)
      return { success: true, guides: response.guides }
    } else {
      const response = await axios.get('/api/guides/search', {
        params: { ...searchFilters, ...filters }
      })
      setGuides(response.data.guides)
      setLoading(false)
      return { success: true, guides: response.data.guides }
    }
  }, '搜尋導遊')

  // 取得導遊詳細資料
  const getGuideById = withErrorHandling(async (guideId) => {
    if (USE_MOCK_API) {
      const response = await mockApi.guides.detail(guideId)
      setCurrentGuide(response.guide)
      return { success: true, guide: response.guide }
    } else {
      const response = await axios.get(`/api/guides/${guideId}`)
      setCurrentGuide(response.data.guide)
      return { success: true, guide: response.data.guide }
    }
  }, '取得導遊資料')

  // 更新導遊個人檔案
  const updateGuideProfile = withErrorHandling(async (guideId, profileData) => {
    const response = await axios.put(`/api/guides/${guideId}`, profileData)
    setCurrentGuide(response.data.guide)
    
    // 更新列表中的導遊資料
    setGuides(prev => prev.map(guide => 
      guide.id === guideId ? response.data.guide : guide
    ))
    
    return { success: true, guide: response.data.guide }
  }, '更新導遊檔案')

  // 設定導遊可用時間
  const updateAvailability = withErrorHandling(async (guideId, availability) => {
    const response = await axios.put(`/api/guides/${guideId}/availability`, {
      availability
    })
    
    if (currentGuide && currentGuide.id === guideId) {
      setCurrentGuide(prev => ({ ...prev, availability: response.data.availability }))
    }
    
    return { success: true, availability: response.data.availability }
  }, '更新可用時間')

  // 設定導遊服務項目
  const updateServices = withErrorHandling(async (guideId, services) => {
    const response = await axios.put(`/api/guides/${guideId}/services`, {
      services
    })
    
    if (currentGuide && currentGuide.id === guideId) {
      setCurrentGuide(prev => ({ ...prev, services: response.data.services }))
    }
    
    return { success: true, services: response.data.services }
  }, '更新服務項目')

  // 取得導遊統計資料
  const getGuideStats = withErrorHandling(async (guideId) => {
    const response = await axios.get(`/api/guides/${guideId}/stats`)
    return { success: true, stats: response.data.stats }
  }, '取得統計資料')

  // 取得導遊評價
  const getGuideReviews = withErrorHandling(async (guideId, page = 1, limit = 10) => {
    const response = await axios.get(`/api/guides/${guideId}/reviews`, {
      params: { page, limit }
    })
    return { success: true, reviews: response.data.reviews, pagination: response.data.pagination }
  }, '取得評價')

  // 回覆評價
  const replyToReview = withErrorHandling(async (reviewId, reply) => {
    const response = await axios.post(`/api/reviews/${reviewId}/reply`, {
      reply
    })
    return { success: true, review: response.data.review }
  }, '回覆評價')

  // 取得導遊收入報告
  const getEarningsReport = withErrorHandling(async (guideId, period = 'month') => {
    const response = await axios.get(`/api/guides/${guideId}/earnings`, {
      params: { period }
    })
    return { success: true, earnings: response.data.earnings }
  }, '取得收入報告')

  // 申請提現
  const requestPayout = withErrorHandling(async (guideId, amount, paymentMethod) => {
    const response = await axios.post(`/api/guides/${guideId}/payout`, {
      amount,
      paymentMethod
    })
    return { success: true, payout: response.data.payout }
  }, '申請提現')

  // 取得熱門導遊
  const getFeaturedGuides = withErrorHandling(async (limit = 6) => {
    const response = await axios.get('/api/guides/featured', {
      params: { limit }
    })
    return { success: true, guides: response.data.guides }
  }, '取得熱門導遊')

  // 取得推薦導遊
  const getRecommendedGuides = withErrorHandling(async (userId, limit = 6) => {
    const response = await axios.get('/api/guides/recommended', {
      params: { userId, limit }
    })
    return { success: true, guides: response.data.guides }
  }, '取得推薦導遊')

  // 更新搜尋篩選器
  const updateSearchFilters = (newFilters) => {
    setSearchFilters(prev => ({ ...prev, ...newFilters }))
  }

  // 清除搜尋篩選器
  const clearSearchFilters = () => {
    setSearchFilters({
      location: '',
      language: '',
      priceRange: '',
      rating: '',
      serviceType: '',
      availability: ''
    })
  }

  // 建立導遊帳戶（註冊時使用）
  const createGuideProfile = withErrorHandling(async (guideData) => {
    const response = await axios.post('/api/guides', {
      ...createDefaultGuide(),
      ...guideData
    })
    return { success: true, guide: response.data.guide }
  }, '建立導遊檔案')

  // 驗證導遊身份
  const verifyGuide = withErrorHandling(async (guideId, verificationData) => {
    const response = await axios.post(`/api/guides/${guideId}/verify`, verificationData)
    
    if (currentGuide && currentGuide.id === guideId) {
      setCurrentGuide(prev => ({ ...prev, verified: response.data.verified }))
    }
    
    return { success: true, verified: response.data.verified }
  }, '驗證導遊身份')

  const value = {
    guides,
    currentGuide,
    loading,
    searchFilters,
    
    // 搜尋和篩選
    searchGuides,
    updateSearchFilters,
    clearSearchFilters,
    
    // 導遊管理
    getGuideById,
    updateGuideProfile,
    createGuideProfile,
    verifyGuide,
    
    // 服務管理
    updateAvailability,
    updateServices,
    
    // 統計和報告
    getGuideStats,
    getEarningsReport,
    requestPayout,
    
    // 評價管理
    getGuideReviews,
    replyToReview,
    
    // 推薦系統
    getFeaturedGuides,
    getRecommendedGuides,
    
    // 工具函數
    setLoading,
    setCurrentGuide
  }

  return (
    <GuideContext.Provider value={value}>
      {children}
    </GuideContext.Provider>
  )
}