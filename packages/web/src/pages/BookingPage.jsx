import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, Clock, MapPin, Star, Users, DollarSign, AlertCircle } from 'lucide-react'

function BookingPage() {
  const { guideId } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  
  const [guide, setGuide] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState({
    date: '',
    time: '',
    duration: 4,
    guests: 1,
    specialRequests: ''
  })
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // Mock guide data fetch
    setTimeout(() => {
      const mockGuide = {
        id: parseInt(guideId),
        name: 'Sarah Chen',
        location: 'Tokyo, Japan',
        rating: 4.9,
        reviewCount: 127,
        price: 50,
        hourlyRate: true,
        avatar: '/api/placeholder/200/200',
        languages: ['English', 'Japanese', 'Mandarin'],
        specialties: ['Cultural Tours', 'Food Tours', 'Historical Sites'],
        description: 'Experienced guide with 5+ years showing visitors the hidden gems of Tokyo. I specialize in cultural immersion experiences and can take you to places that most tourists never see.',
        verified: true,
        responseTime: '< 1 hour',
        availability: {
          '2024-02-15': ['09:00', '10:00', '14:00', '15:00'],
          '2024-02-16': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
          '2024-02-17': ['10:00', '14:00', '15:00'],
          '2024-02-18': ['09:00', '10:00', '11:00', '14:00', '15:00'],
        },
        tourTypes: [
          { name: 'Half Day Tour', duration: 4, price: 200 },
          { name: 'Full Day Tour', duration: 8, price: 380 },
          { name: 'Evening Experience', duration: 3, price: 150 }
        ],
        reviews: [
          {
            id: 1,
            customer: 'John Smith',
            rating: 5,
            comment: 'Amazing experience! Sarah showed us the real Tokyo.',
            date: '2024-01-15'
          },
          {
            id: 2,
            customer: 'Emma Wilson',
            rating: 5,
            comment: 'Professional and knowledgeable. Highly recommended!',
            date: '2024-01-10'
          }
        ]
      }
      setGuide(mockGuide)
      setLoading(false)
    }, 1000)
  }, [guideId])

  useEffect(() => {
    if (guide) {
      const basePrice = guide.price * booking.duration
      const guestMultiplier = booking.guests > 1 ? 1 + (booking.guests - 1) * 0.5 : 1
      setTotal(Math.round(basePrice * guestMultiplier))
    }
  }, [guide, booking.duration, booking.guests])

  const handleBookingChange = (field, value) => {
    setBooking(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getAvailableTimes = () => {
    if (!booking.date || !guide?.availability) return []
    return guide.availability[booking.date] || []
  }

  const validateBooking = () => {
    if (!isAuthenticated) {
      setError('Please log in to make a booking')
      return false
    }
    if (!booking.date) {
      setError('Please select a date')
      return false
    }
    if (!booking.time) {
      setError('Please select a time')
      return false
    }
    if (booking.guests < 1 || booking.guests > 10) {
      setError('Number of guests must be between 1 and 10')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateBooking()) return
    
    setSubmitting(true)
    
    try {
      // Mock booking creation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to payment page
      const bookingData = {
        guideId: guide.id,
        guideName: guide.name,
        ...booking,
        total,
        status: 'pending'
      }
      
      // In a real app, you'd save this to the backend and get a booking ID
      localStorage.setItem('pendingBooking', JSON.stringify(bookingData))
      navigate('/payment/temp-booking-id')
      
    } catch (error) {
      setError('Failed to create booking. Please try again.')
    } finally {
      setSubmitting(false)
    }
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

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Guide not found</h2>
          <button
            onClick={() => navigate('/guides')}
            className="btn-primary"
          >
            Back to Guides
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Guide Information */}
          <div>
            <div className="card mb-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-dark-700 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-10 h-10 text-dark-400" />
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <h1 className="text-2xl font-bold mr-2">{guide.name}</h1>
                    {guide.verified && (
                      <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center text-dark-300 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{guide.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{guide.rating}</span>
                    <span className="text-dark-300 ml-1">({guide.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-dark-300 mb-6">{guide.description}</p>

              {/* Languages */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.languages.map((lang, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-dark-700 text-sm rounded-full"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-500/20 text-primary-400 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="text-center py-4 bg-dark-700 rounded-xl">
                <span className="text-3xl font-bold text-primary-500">
                  ${guide.price}
                </span>
                <span className="text-dark-300 ml-2">per hour</span>
              </div>
            </div>

            {/* Reviews */}
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Recent Reviews</h3>
              <div className="space-y-4">
                {guide.reviews.map((review) => (
                  <div key={review.id} className="border-b border-dark-600 pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-dark-600'}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">{review.customer}</span>
                      <span className="ml-auto text-sm text-dark-400">{review.date}</span>
                    </div>
                    <p className="text-dark-300">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Book Your Tour</h2>

              {error && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-red-300">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={booking.date}
                    onChange={(e) => handleBookingChange('date', e.target.value)}
                    min={getMinDate()}
                    className="input-field"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Time
                  </label>
                  <select
                    value={booking.time}
                    onChange={(e) => handleBookingChange('time', e.target.value)}
                    className="input-field"
                    required
                    disabled={!booking.date}
                  >
                    <option value="">Select time</option>
                    {getAvailableTimes().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {booking.date && getAvailableTimes().length === 0 && (
                    <p className="text-sm text-yellow-400 mt-1">
                      No available times for this date
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration (hours)
                  </label>
                  <select
                    value={booking.duration}
                    onChange={(e) => handleBookingChange('duration', parseInt(e.target.value))}
                    className="input-field"
                  >
                    <option value={3}>3 hours</option>
                    <option value={4}>4 hours</option>
                    <option value={6}>6 hours</option>
                    <option value={8}>8 hours (Full day)</option>
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Guests
                  </label>
                  <select
                    value={booking.guests}
                    onChange={(e) => handleBookingChange('guests', parseInt(e.target.value))}
                    className="input-field"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={booking.specialRequests}
                    onChange={(e) => handleBookingChange('specialRequests', e.target.value)}
                    className="input-field resize-none"
                    rows={3}
                    placeholder="Any special requests or preferences..."
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-dark-700 rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Price Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base rate (${guide.price}/hour × {booking.duration} hours)</span>
                      <span>${guide.price * booking.duration}</span>
                    </div>
                    {booking.guests > 1 && (
                      <div className="flex justify-between">
                        <span>Additional guests ({booking.guests - 1} × 50%)</span>
                        <span>+${Math.round(guide.price * booking.duration * (booking.guests - 1) * 0.5)}</span>
                      </div>
                    )}
                    <div className="border-t border-dark-600 pt-2 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="text-primary-500">${total}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || !isAuthenticated}
                  className="btn-primary w-full"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Creating Booking...
                    </>
                  ) : (
                    <>
                      <DollarSign className="w-4 h-4 mr-2" />
                      Book Now - ${total}
                    </>
                  )}
                </button>

                {!isAuthenticated && (
                  <p className="text-center text-dark-300 text-sm">
                    Please <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="text-primary-500 hover:text-primary-400"
                    >
                      log in
                    </button> to make a booking
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage