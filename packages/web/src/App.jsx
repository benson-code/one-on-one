import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { LanguageProvider } from './context/LanguageContext'
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

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AuthProvider>
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
                </Routes>
              </ErrorBoundary>
            </Layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App