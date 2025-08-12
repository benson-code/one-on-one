import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Calendar, DollarSign, Users, Star, Clock, MapPin, TrendingUp, Settings } from 'lucide-react'

interface Customer {
  name: string
  avatar: string
}

interface Booking {
  id: number
  customer: Customer
  date: string
  time: string
  duration: number
  price: number
  status: 'confirmed' | 'pending' | 'completed'
  location: string
}

interface Stats {
  totalEarnings: number
  monthlyEarnings: number
  totalBookings: number
  averageRating: number
  responseRate: number
  completionRate: number
}

function GuideDashboard() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState<Stats>({} as Stats)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // Mock data for demonstration
    setTimeout(() => {
      setStats({
        totalEarnings: 2450,
        monthlyEarnings: 890,
        totalBookings: 47,
        averageRating: 4.8,
        responseRate: 95,
        completionRate: 98
      })
      
      setBookings([
        {
          id: 1,
          customer: {
            name: 'John Smith',
            avatar: '/api/placeholder/50/50'
          },
          date: '2024-02-15',
          time: '10:00 AM',
          duration: 4,
          price: 200,
          status: 'confirmed',
          location: 'Downtown Tokyo Tour'
        },
        {
          id: 2,
          customer: {
            name: 'Emily Johnson',
            avatar: '/api/placeholder/50/50'
          },
          date: '2024-02-16',
          time: '2:00 PM',
          duration: 6,
          price: 300,
          status: 'pending',
          location: 'Traditional Districts'
        },
        {
          id: 3,
          customer: {
            name: 'David Chen',
            avatar: '/api/placeholder/50/50'
          },
          date: '2024-02-18',
          time: '9:00 AM',
          duration: 8,
          price: 400,
          status: 'confirmed',
          location: 'Full Day Experience'
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
            Guide Dashboard
          </h1>
          <p className="text-dark-300">
            Welcome back, {user?.firstName}! Manage your tours and earnings
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-300 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-green-400">${stats.totalEarnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-300 text-sm">This Month</p>
                <p className="text-2xl font-bold text-primary-500">${stats.monthlyEarnings}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary-500" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-300 text-sm">Total Tours</p>
                <p className="text-2xl font-bold">{stats.totalBookings}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-300 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.averageRating}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-dark-300">Response Rate</span>
                <span className="font-semibold">{stats.responseRate}%</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full" 
                  style={{ width: `${stats.responseRate}%` }}
                ></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-dark-300">Completion Rate</span>
                <span className="font-semibold">{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full" 
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="btn-primary w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Set Availability
              </button>
              <button className="btn-secondary w-full">
                <Settings className="w-4 h-4 mr-2" />
                Update Profile
              </button>
              <button className="btn-secondary w-full">
                <DollarSign className="w-4 h-4 mr-2" />
                Withdraw Earnings
              </button>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Upcoming Bookings</h2>
            <button className="text-primary-500 hover:text-primary-400 transition-colors">
              View All →
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-dark-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No upcoming bookings</h3>
              <p className="text-dark-300">Your schedule is clear for now</p>
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
                        <Users className="w-6 h-6 text-dark-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{booking.customer.name}</h3>
                        <div className="flex items-center text-dark-300 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{booking.location}</span>
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
                        <div className="text-sm text-dark-300">Earnings</div>
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
                    {booking.status === 'pending' && (
                      <>
                        <button className="btn-primary">
                          Accept
                        </button>
                        <button className="btn-secondary">
                          Decline
                        </button>
                      </>
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

        {/* Earnings Chart Placeholder */}
        <div className="mt-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Earnings Overview</h2>
            <div className="h-64 bg-dark-700 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-16 h-16 text-dark-400 mx-auto mb-4" />
                <p className="text-dark-300">Earnings chart will be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuideDashboard