import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import logoSvg from '../assets/logo.svg'

function Layout({ children }) {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden bg-[var(--background-color)] text-[var(--text-primary)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[var(--accent-color)] px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              {/* ONEonone Logo SVG */}
              <img 
                src={logoSvg} 
                alt="ONEonone Logo" 
                className="h-6 w-6 sm:h-8 sm:w-8" 
              />
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold">ONEonone</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-4 lg:gap-8">
              <Link className="text-base font-medium hover:text-[var(--primary-color)] transition-colors" to="/guides">
                探索
              </Link>
              <Link className="text-base font-medium hover:text-[var(--primary-color)] transition-colors" to="/register">
                成為導遊
              </Link>
              <a className="text-base font-medium hover:text-[var(--primary-color)] transition-colors" href="#">
                幫助
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-3">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 h-8 sm:w-10 sm:h-10" 
                  style={{
                    backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHjsUkZzwhLyFw9pRz9dYP3ajmxNZddc1ljPKIH87W11KW53-5DRP_8rjFOw1-DfZsIQPkQd0saOHD6am1ikrEQE7ELbV3dbEnjgCLADN2iPTazggASW7cDOIj_rsdc2rVgxpP3U0CmRM1vK4qW0MnuPPkofx1LJq2OrRip8NCxzJ2zajEMYKgdTN_XTnrTVFqw9xVsxlGxhku-CXlCq4qLN54IF8Arnyo20A2bSODvCmiCMhu3INZy0sm2Mz1HJipAdLY9Phd8Y1'}")`
                  }}
                >
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden lg:block text-sm font-medium text-[var(--text-secondary)] hover:text-red-400 transition-colors"
                >
                  登出
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                <Link to="/login" className="text-sm sm:text-base font-medium hover:text-[var(--primary-color)] transition-colors">
                  登入
                </Link>
                <Link to="/register" className="button_primary text-sm sm:text-base px-3 sm:px-4 py-2">
                  註冊
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Slide-in Menu */}
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[var(--card-background)] shadow-2xl z-50 md:hidden transform translate-x-0 transition-transform duration-300 ease-in-out">
              
              {/* Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--accent-color)]">
                <div className="flex items-center gap-3">
                  <img 
                    src={logoSvg} 
                    alt="ONEonone Logo" 
                    className="h-8 w-8" 
                  />
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">ONEonone</h2>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-[var(--accent-color)] transition-colors"
                >
                  <X className="w-6 h-6 text-[var(--text-secondary)]" />
                </button>
              </div>

              {/* User Section */}
              {isAuthenticated && (
                <div className="p-6 border-b border-[var(--accent-color)]">
                  <div className="flex items-center gap-3">
                    <div 
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-12 h-12" 
                      style={{
                        backgroundImage: `url("${user?.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHjsUkZzwhLyFw9pRz9dYP3ajmxNZddc1ljPKIH87W11KW53-5DRP_8rjFOw1-DfZsIQPkQd0saOHD6am1ikrEQE7ELbV3dbEnjgCLADN2iPTazggASW7cDOIj_rsdc2rVgxpP3U0CmRM1vK4qW0MnuPPkofx1LJq2OrRip8NCxzJ2zajEMYKgdTN_XTnrTVFqw9xVsxlGxhku-CXlCq4qLN54IF8Arnyo20A2bSODvCmiCMhu3INZy0sm2Mz1HJipAdLY9Phd8Y1'}")`
                      }}
                    />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">
                        {user?.name || '用戶'}
                      </p>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {user?.userType === 'guide' ? '導遊' : '旅客'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Menu */}
              <nav className="flex-1 py-6">
                <div className="space-y-2 px-6">
                  
                  {/* Main Navigation Items */}
                  <Link 
                    to="/guides" 
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="font-medium">探索導遊</span>
                  </Link>

                  <Link 
                    to="/register" 
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">成為導遊</span>
                  </Link>

                  <a 
                    href="#" 
                    className="flex items-center gap-4 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 group"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">幫助</span>
                  </a>

                  {/* Divider */}
                  <div className="border-t border-[var(--accent-color)] my-4"></div>

                  {/* Authentication Section */}
                  {isAuthenticated ? (
                    <>
                      <Link 
                        to={user?.userType === 'guide' ? '/guide/dashboard' : '/customer/dashboard'}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-medium">儀表板</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMobileMenuOpen(false)
                        }}
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-red-500 hover:text-white transition-all duration-200 group w-full"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">登出</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        className="flex items-center gap-4 px-4 py-3 rounded-xl text-[var(--text-primary)] hover:bg-[var(--primary-color)] hover:text-white transition-all duration-200 group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        <span className="font-medium">登入</span>
                      </Link>

                      <Link 
                        to="/register" 
                        className="flex items-center justify-center gap-2 mx-4 mt-4 px-4 py-3 rounded-xl bg-[var(--primary-color)] text-white font-semibold hover:opacity-90 transition-opacity"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        <span>立即註冊</span>
                      </Link>
                    </>
                  )}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-[var(--accent-color)]">
                <p className="text-xs text-[var(--text-secondary)] text-center">
                  © 2024 ONEonone. 版權所有
                </p>
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex flex-1 justify-center py-6 sm:py-8 lg:py-12 px-2 sm:px-4">
          <div className="w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout