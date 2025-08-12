import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Wallet, Copy, Check, AlertCircle, Shield, DollarSign } from 'lucide-react'
import { safeLocalStorage, logError } from '../utils/errorHandler'
import { Booking } from '../types'

function PaymentPage() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(true)
  const [paymentStep, setPaymentStep] = useState('review') // review, payment, confirmation
  const [paymentData, setPaymentData] = useState({
    walletAddress: '',
    transactionHash: ''
  })
  const [copied, setCopied] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Mock wallet address for receiving USDT
  const merchantWallet = 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE'
  const usdtRate = 1.00 // 1 USD = 1 USDT for simplicity

  useEffect(() => {
    // Load booking data (in real app, fetch from backend)
    try {
      const pendingBooking = safeLocalStorage.getItem('pendingBooking')
      if (pendingBooking) {
        setBooking(JSON.parse(pendingBooking))
      }
    } catch (error: unknown) {
      logError(error as Error, 'PaymentPage - Loading booking data')
      // 如果無法載入預訂資料，導航到首頁
      navigate('/')
      return
    }
    setLoading(false)
  }, [bookingId, navigate])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error: unknown) {
      logError(error as Error, 'PaymentPage - Copy to clipboard')
      // 提供備用複製方式
      try {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackError: unknown) {
        logError(fallbackError as Error, 'PaymentPage - Fallback copy method')
        alert('無法自動複製，請手動選擇並複製地址')
      }
    }
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!paymentData.walletAddress || !paymentData.transactionHash) {
      setError('Please fill in all payment details')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      // Mock payment verification (in real app, verify transaction on blockchain)
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update booking status
      const updatedBooking = booking ? {
        ...booking,
        paymentStatus: 'completed' as const,
        status: 'confirmed' as const,
        transactionHash: paymentData.transactionHash
      } : null
      
      localStorage.setItem('confirmedBooking', JSON.stringify(updatedBooking))
      localStorage.removeItem('pendingBooking')
      
      setPaymentStep('confirmation')
    } catch (error) {
      setError('Payment verification failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoToDashboard = () => {
    navigate('/customer/dashboard')
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

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Booking not found</h2>
          <button
            onClick={() => navigate('/customer/dashboard')}
            className="btn-primary"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {['review', 'payment', 'confirmation'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  paymentStep === step 
                    ? 'bg-primary-500 text-white' 
                    : index < ['review', 'payment', 'confirmation'].indexOf(paymentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-dark-600 text-dark-300'
                }`}>
                  {index < ['review', 'payment', 'confirmation'].indexOf(paymentStep) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < 2 && (
                  <div className={`w-12 h-0.5 ${
                    index < ['review', 'payment', 'confirmation'].indexOf(paymentStep)
                      ? 'bg-green-500'
                      : 'bg-dark-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 mt-2 text-sm text-dark-300">
            <span>Review</span>
            <span>Payment</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Review Step */}
        {paymentStep === 'review' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>
            
            {/* Booking Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-dark-300">Guide:</span>
                <span className="font-medium">{booking.guideName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-300">Date:</span>
                <span className="font-medium">{booking.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-300">Time:</span>
                <span className="font-medium">{booking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-300">Duration:</span>
                <span className="font-medium">{booking.duration} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-dark-300">Guests:</span>
                <span className="font-medium">{booking.guests}</span>
              </div>
              {booking.specialRequests && (
                <div>
                  <span className="text-dark-300">Special Requests:</span>
                  <p className="mt-1 text-sm">{booking.specialRequests}</p>
                </div>
              )}
            </div>

            {/* Price Summary */}
            <div className="bg-dark-700 rounded-xl p-4 mb-6">
              <h3 className="font-semibold mb-3">Payment Summary</h3>
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount:</span>
                <span className="text-primary-500">${booking.total}</span>
              </div>
              <div className="flex justify-between text-sm text-dark-300 mt-1">
                <span>USDT Amount:</span>
                <span>{(booking.total * usdtRate).toFixed(2)} USDT</span>
              </div>
            </div>

            <button
              onClick={() => setPaymentStep('payment')}
              className="btn-primary w-full"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Proceed to Payment
            </button>
          </div>
        )}

        {/* Payment Step */}
        {paymentStep === 'payment' && (
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">
              <Wallet className="w-6 h-6 inline mr-2" />
使用 USDT 付款
            </h2>

            {/* Security Notice */}
            <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-center mb-2">
                <Shield className="w-5 h-5 text-primary-400 mr-2" />
                <span className="font-medium text-primary-400">Secure Payment</span>
              </div>
              <p className="text-sm text-dark-300">
                Your payment is secured by blockchain technology. Only send USDT to the address below.
              </p>
            </div>

            {/* Payment Instructions */}
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Payment Instructions:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-dark-300">
                  <li>Send exactly <strong className="text-white">{(booking.total * usdtRate).toFixed(2)} USDT</strong> to the address below</li>
                  <li>Copy your wallet address and transaction hash</li>
                  <li>Submit the payment details for verification</li>
                  <li>Wait for confirmation (usually takes 1-5 minutes)</li>
                </ol>
              </div>

              {/* Merchant Wallet Address */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Send USDT to this address:
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={merchantWallet}
                    readOnly
                    className="input-field flex-1 bg-dark-700"
                  />
                  <button
                    onClick={() => copyToClipboard(merchantWallet)}
                    className="ml-2 p-3 bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {copied && (
                  <p className="text-green-400 text-sm mt-1">Address copied to clipboard!</p>
                )}
              </div>

              {/* Amount Display */}
              <div className="bg-dark-700 rounded-xl p-4 text-center">
                <p className="text-dark-300 mb-1">Amount to Send:</p>
                <p className="text-2xl font-bold text-primary-500">
                  {(booking.total * usdtRate).toFixed(2)} USDT
                </p>
                <p className="text-sm text-dark-400">
                  ≈ ${booking.total} USD
                </p>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                {error && (
                  <div className="p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                    <span className="text-red-300">{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Wallet Address:
                  </label>
                  <input
                    type="text"
                    value={paymentData.walletAddress}
                    onChange={(e) => setPaymentData({...paymentData, walletAddress: e.target.value})}
                    className="input-field"
                    placeholder="Enter your USDT wallet address"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Transaction Hash:
                  </label>
                  <input
                    type="text"
                    value={paymentData.transactionHash}
                    onChange={(e) => setPaymentData({...paymentData, transactionHash: e.target.value})}
                    className="input-field"
                    placeholder="Enter transaction hash after sending USDT"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying Payment...
                    </>
                  ) : (
                    'Verify Payment'
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Step */}
        {paymentStep === 'confirmation' && (
          <div className="card text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Payment Confirmed!
            </h2>
            
            <p className="text-dark-300 mb-6">
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </p>

            {/* Booking Summary */}
            <div className="bg-dark-700 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold mb-3">Booking Confirmed</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-300">Guide:</span>
                  <span>{booking.guideName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">Date & Time:</span>
                  <span>{booking.date} at {booking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">Duration:</span>
                  <span>{booking.duration} hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-300">Total Paid:</span>
                  <span className="text-green-400 font-medium">${booking.total}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoToDashboard}
                className="btn-primary w-full"
              >
                Go to Dashboard
              </button>
              
              <p className="text-sm text-dark-300">
                Your guide will contact you within 24 hours to confirm details.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentPage