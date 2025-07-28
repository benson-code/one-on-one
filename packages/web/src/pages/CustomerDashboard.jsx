import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Calendar, MapPin, Star, Clock, DollarSign, User, Search } from 'lucide-react'

function CustomerDashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for demonstration
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          guide: {
            name: 'Sarah Chen',
            avatar: '/api/placeholder/50/50',
            rating: 4.9
          },
          location: 'Tokyo, Japan',
          date: '2024-02-15',
          time: '10:00 AM',
          duration: 4,
          price: 200,
          status: 'confirmed',
          paymentStatus: 'paid'
        },
        {
          id: 2,
          guide: {
            name: 'Marco Rodriguez',
            avatar: '/api/placeholder/50/50',
            rating: 4.8
          },
          location: 'Barcelona, Spain',
          date: '2024-02-20',
          time: '2:00 PM',
          duration: 6,
          price: 270,
          status: 'pending',
          paymentStatus: 'pending'
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-400 bg-green-400/10'
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'cancelled':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-dark-400 bg-dark-700'
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

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-dark-300">
            Manage your bookings and discover new tour experiences
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Link 
            to="/guides"
            className="card hover:scale-105 transition-transform duration-200 text-center"
          >
            <Search className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Find Guides</h3>
            <p className="text-sm text-dark-300">Discover local experts</p>
          </Link>

          <div className="card text-center">
            <Calendar className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">My Bookings</h3>
            <p className="text-sm text-dark-300">{bookings.length} active</p>
          </div>

          <div className="card text-center">
            <Star className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Reviews</h3>
            <p className="text-sm text-dark-300">Rate your experiences</p>
          </div>

          <div className="card text-center">
            <DollarSign className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Payment History</h3>
            <p className="text-sm text-dark-300">View transactions</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Bookings</h2>
            <Link 
              to="/bookings"
              className="text-primary-500 hover:text-primary-400 transition-colors"
            >
              View All →
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
              <p className="text-dark-300 mb-6">Start exploring and book your first tour!</p>
              <Link to="/guides" className="btn-primary">
                Find a Guide
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="border border-dark-600 rounded-xl p-6 hover:border-dark-500 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-dark-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{booking.guide.name}</h3>
                        <div className="flex items-center text-dark-300 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{booking.location}</span>
                        </div>
                        <div className="flex items-center mt-1">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm">{booking.guide.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <Calendar className="w-5 h-5 text-dark-400 mx-auto mb-1" />
                        <div className="text-sm text-dark-300">Date</div>
                        <div className="font-medium">{booking.date}</div>
                      </div>
                      
                      <div>
                        <Clock className="w-5 h-5 text-dark-400 mx-auto mb-1" />
                        <div className="text-sm text-dark-300">Time</div>
                        <div className="font-medium">{booking.time}</div>
                      </div>
                      
                      <div>
                        <DollarSign className="w-5 h-5 text-dark-400 mx-auto mb-1" />
                        <div className="text-sm text-dark-300">Price</div>
                        <div className="font-medium">${booking.price}</div>
                      </div>
                      
                      <div>
                        <span 
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    {booking.status === 'pending' && booking.paymentStatus === 'pending' && (
                      <Link 
                        to={`/payment/${booking.id}`}
                        className="btn-primary"
                      >
                        Complete Payment
                      </Link>
                    )}
                    <button className="btn-secondary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Guides */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-dark-600 rounded-xl p-4">
                  <div className="w-16 h-16 bg-dark-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-8 h-8 text-dark-400" />
                  </div>
                  <h3 className="font-semibold text-center mb-2">Guide Name</h3>
                  <div className="text-center text-dark-300 text-sm mb-4">
                    <div>Location</div>
                    <div className="flex items-center justify-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>4.8</span>
                    </div>
                  </div>
                  <Link to="/guides" className="btn-primary w-full text-sm">
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard