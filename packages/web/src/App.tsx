import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
import { GuideProvider } from './context/GuideContext'
import { BookingProvider } from './context/BookingContext'
import { PaymentProvider } from './context/PaymentContext'
import { NotificationProvider } from './context/NotificationContext'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CustomerDashboard from './pages/CustomerDashboard'
import GuideDashboard from './pages/GuideDashboard'
import GuidesList from './pages/GuidesList'
import BookingPage from './pages/BookingPage'
import PaymentPage from './pages/PaymentPage'
import About from './pages/About'

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
          <NotificationProvider>
            <GuideProvider>
              <BookingProvider>
                <PaymentProvider>
                  <Router>
                    <Layout>
                      <ErrorBoundary>
                        <Routes>
                          <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
                          <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
                          <Route path="/register" element={<ErrorBoundary><Register /></ErrorBoundary>} />
                          <Route path="/customer/dashboard" element={<ErrorBoundary><CustomerDashboard /></ErrorBoundary>} />
                          <Route path="/guide/dashboard" element={<ErrorBoundary><GuideDashboard /></ErrorBoundary>} />
                          <Route path="/guides" element={<ErrorBoundary><GuidesList /></ErrorBoundary>} />
                          <Route path="/booking/:guideId" element={<ErrorBoundary><BookingPage /></ErrorBoundary>} />
                          <Route path="/payment/:bookingId" element={<ErrorBoundary><PaymentPage /></ErrorBoundary>} />
                          <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
                        </Routes>
                      </ErrorBoundary>
                    </Layout>
                  </Router>
                </PaymentProvider>
              </BookingProvider>
            </GuideProvider>
          </NotificationProvider>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App