import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { withErrorHandling } from '../utils/errorHandler'
import { Guide, GuideContextType, GuideFilters } from '../types'
import { mockApi } from '../utils/mockApi'

// 開發模式下使用 Mock API
const USE_MOCK_API = process.env.NODE_ENV === 'development' || true

const GuideContext = createContext<GuideContextType>({
  guides: [],
  selectedGuide: null,
  loading: false,
  error: null,
  fetchGuides: async () => {},
  searchGuides: async () => [],
  getGuideById: async () => null,
  setSelectedGuide: () => {}
})

export function useGuide(): GuideContextType {
  return useContext(GuideContext)
}

interface GuideProviderProps {
  children: ReactNode
}

export function GuideProvider({ children }: GuideProviderProps) {
  const [guides, setGuides] = useState<Guide[]>([])
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // 獲取所有導遊
  const fetchGuides = withErrorHandling(async () => {
    setLoading(true)
    setError(null)
    
    if (USE_MOCK_API) {
      const response = await mockApi.guides.getAll()
      setGuides(response)
      setLoading(false)
      return { success: true }
    } else {
      const response = await axios.get('/api/guides')
      setGuides(response.data.guides)
      setLoading(false)
      return { success: true }
    }
  }, '獲取導遊列表')

  // 搜尋導遊
  const searchGuides = withErrorHandling(async (query: string = '', filters?: GuideFilters) => {
    setLoading(true)
    setError(null)
    
    if (USE_MOCK_API) {
      const response = await mockApi.guides.search(query, filters)
      setGuides(response)
      setLoading(false)
      return response
    } else {
      const response = await axios.get('/api/guides/search', {
        params: { query, ...filters }
      })
      setGuides(response.data.guides)
      setLoading(false)
      return response.data.guides
    }
  }, '搜尋導遊')

  // 取得導遊詳細資料
  const getGuideById = withErrorHandling(async (guideId: string) => {
    setLoading(true)
    setError(null)
    
    if (USE_MOCK_API) {
      const response = await mockApi.guides.getById(guideId)
      setSelectedGuide(response)
      setLoading(false)
      return response
    } else {
      const response = await axios.get(`/api/guides/${guideId}`)
      setSelectedGuide(response.data.guide)
      setLoading(false)
      return response.data.guide
    }
  }, '獲取導遊詳情')

  // 初始化時獲取導遊列表
  useEffect(() => {
    const initGuides = async () => {
      const result = await fetchGuides()
      if (!result.success) {
        setError(result.error || '獲取導遊列表失敗')
      }
    }
    
    initGuides()
  }, [])

  const value: GuideContextType = {
    guides,
    selectedGuide,
    loading,
    error,
    fetchGuides: async () => {
      const result = await fetchGuides()
      if (!result.success) {
        setError(result.error || '獲取導遊列表失敗')
      }
    },
    searchGuides: async (query: string = '', filters?: GuideFilters) => {
      const result = await searchGuides(query, filters)
      if (Array.isArray(result)) {
        return result
      } else if (result.success) {
        return result.data || []
      } else {
        setError(result.error || '搜尋導遊失敗')
        return []
      }
    },
    getGuideById: async (id: string) => {
      const result = await getGuideById(id)
      if (result && typeof result === 'object' && 'success' in result) {
        if (result.success && result.data) {
          return result.data as Guide
        } else {
          setError(result.error || '獲取導遊詳情失敗')
          return null
        }
      } else if (result && typeof result === 'object' && 'id' in result) {
        return result as Guide
      } else {
        setError('獲取導遊詳情失敗')
        return null
      }
    },
    setSelectedGuide
  }

  return (
    <GuideContext.Provider value={value}>
      {children}
    </GuideContext.Provider>
  )
}