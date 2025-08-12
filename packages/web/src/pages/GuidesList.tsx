import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, Users, Search, Filter, ChevronDown } from 'lucide-react'

interface MockGuide {
  id: number
  name: string
  location: string
  rating: number
  reviewCount: number
  price: number
  hourlyRate: boolean
  avatar: string
  languages: string[]
  specialties: string[]
  description: string
  verified: boolean
  responseTime: string
}

function GuidesList() {
  const [guides, setGuides] = useState<MockGuide[]>([])
  const [filteredGuides, setFilteredGuides] = useState<MockGuide[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    language: '',
    priceRange: '',
    rating: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Mock data for demonstration
    setTimeout(() => {
      const mockGuides = [
        {
          id: 1,
          name: 'Sarah Chen',
          location: 'Tokyo, Japan',
          rating: 4.9,
          reviewCount: 127,
          price: 50,
          hourlyRate: true,
          avatar: '/api/placeholder/150/150',
          languages: ['English', 'Japanese', 'Mandarin'],
          specialties: ['Cultural Tours', 'Food Tours', 'Historical Sites'],
          description: 'Experienced guide with 5+ years showing visitors the hidden gems of Tokyo.',
          verified: true,
          responseTime: '< 1 hour'
        },
        {
          id: 2,
          name: 'Marco Rodriguez',
          location: 'Barcelona, Spain',
          rating: 4.8,
          reviewCount: 89,
          price: 45,
          hourlyRate: true,
          avatar: '/api/placeholder/150/150',
          languages: ['Spanish', 'English', 'Catalan'],
          specialties: ['Architecture', 'Art Tours', 'Local Culture'],
          description: 'Local architect turned tour guide, passionate about Gaudí and Barcelona\'s history.',
          verified: true,
          responseTime: '< 2 hours'
        },
        {
          id: 3,
          name: 'Emma Thompson',
          location: 'London, UK',
          rating: 4.9,
          reviewCount: 156,
          price: 60,
          hourlyRate: true,
          avatar: '/api/placeholder/150/150',
          languages: ['English', 'French'],
          specialties: ['Royal History', 'Museums', 'Literary Tours'],
          description: 'Former museum curator with expertise in British history and royal heritage.',
          verified: true,
          responseTime: '< 30 min'
        },
        {
          id: 4,
          name: 'Ahmed Hassan',
          location: 'Cairo, Egypt',
          rating: 4.7,
          reviewCount: 73,
          price: 35,
          hourlyRate: true,
          avatar: '/api/placeholder/150/150',
          languages: ['Arabic', 'English', 'French'],
          specialties: ['Ancient History', 'Pyramids', 'Islamic Cairo'],
          description: 'Egyptologist with deep knowledge of ancient Egyptian civilization.',
          verified: true,
          responseTime: '< 3 hours'
        },
        {
          id: 5,
          name: 'Yuki Tanaka',
          location: 'Kyoto, Japan',
          rating: 4.8,
          reviewCount: 92,
          price: 55,
          hourlyRate: true,
          avatar: '/api/placeholder/150/150',
          languages: ['Japanese', 'English'],
          specialties: ['Traditional Culture', 'Temples', 'Tea Ceremony'],
          description: 'Traditional tea ceremony master offering authentic cultural experiences.',
          verified: true,
          responseTime: '< 1 hour'
        },
        {
          id: 6,
          name: 'Isabella Silva',
          location: 'Rio de Janeiro, Brazil',
          rating: 4.6,
          reviewCount: 64,
          price: 40,
          hourlyRate: true,
          avatar: '/api/placeholder/150/150',
          languages: ['Portuguese', 'English', 'Spanish'],
          specialties: ['Beach Tours', 'Local Music', 'Street Art'],
          description: 'Born and raised Carioca, expert in Rio\'s vibrant culture and nightlife.',
          verified: true,
          responseTime: '< 2 hours'
        }
      ]
      setGuides(mockGuides)
      setFilteredGuides(mockGuides)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = guides.filter(guide => 
      guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

    if (filters.location) {
      filtered = filtered.filter(guide => 
        guide.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.language) {
      filtered = filtered.filter(guide => 
        guide.languages.some(lang => 
          lang.toLowerCase().includes(filters.language.toLowerCase())
        )
      )
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number)
      filtered = filtered.filter(guide => {
        if (max) {
          return guide.price >= min && guide.price <= max
        } else {
          return guide.price >= min
        }
      })
    }

    if (filters.rating) {
      const minRating = parseFloat(filters.rating)
      filtered = filtered.filter(guide => guide.rating >= minRating)
    }

    setFilteredGuides(filtered)
  }, [searchTerm, filters, guides])

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }

  const clearFilters = () => {
    setFilters({
      location: '',
      language: '',
      priceRange: '',
      rating: ''
    })
    setSearchTerm('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-300">載入中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">醫師列表</h1>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-dark-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search by name, location, or specialty..."
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 card">
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
地點
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Locations</option>
                    <option value="Tokyo">Tokyo</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="London">London</option>
                    <option value="Cairo">Cairo</option>
                    <option value="Kyoto">Kyoto</option>
                    <option value="Rio">Rio de Janeiro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
語言
                  </label>
                  <select
                    value={filters.language}
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                    className="input-field"
                  >
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Japanese">Japanese</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Portuguese">Portuguese</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
價格
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Price</option>
                    <option value="0-30">$0 - $30</option>
                    <option value="30-50">$30 - $50</option>
                    <option value="50-70">$50 - $70</option>
                    <option value="70">$70+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
最低評分
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Any Rating</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.7">4.7+</option>
                    <option value="4.8">4.8+</option>
                    <option value="4.9">4.9+</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-primary-500 hover:text-primary-400 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-dark-300">
            Showing {filteredGuides.length} of {guides.length} guides
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div key={guide.id} className="card hover:scale-105 transition-transform duration-200">
              {/* Guide Avatar and Basic Info */}
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-dark-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-dark-400" />
                </div>
                
                <div className="flex items-center justify-center mb-2">
                  <h3 className="text-xl font-semibold mr-2">{guide.name}</h3>
                  {guide.verified && (
                    <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-center text-dark-300 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{guide.location}</span>
                </div>
                
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium">{guide.rating}</span>
                  <span className="text-dark-300 text-sm ml-1">({guide.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <div className="flex flex-wrap justify-center gap-1">
                  {guide.languages.map((lang, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-dark-700 text-xs rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap justify-center gap-1">
                  {guide.specialties.slice(0, 3).map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-dark-300 text-sm text-center mb-4 line-clamp-2">
                {guide.description}
              </p>

              {/* Response Time */}
              <div className="text-center text-xs text-dark-400 mb-4">
                Usually responds {guide.responseTime}
              </div>

              {/* Price and Book Button */}
              <div className="text-center">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-primary-500">
                    ${guide.price}
                  </span>
                  <span className="text-dark-300 text-sm ml-1">
                    {guide.hourlyRate ? '/小時' : ''}
                  </span>
                </div>
                
                <Link 
                  to={`/booking/${guide.id}`}
                  className="btn-primary w-full"
                >
立即預訂
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredGuides.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-dark-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No guides found</h3>
            <p className="text-dark-300 mb-6">
              Try adjusting your search criteria or filters
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuidesList