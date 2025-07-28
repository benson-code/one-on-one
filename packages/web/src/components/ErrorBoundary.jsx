import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    if (process.env.NODE_ENV === 'production') {
      this.logErrorToService(error, errorInfo)
    }
  }

  logErrorToService = (error, errorInfo) => {
    try {
      fetch('/api/logs/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(() => {
        console.warn('Failed to log error to service')
      })
    } catch (e) {
      console.warn('Error logging service unavailable')
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--background-color)] px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-[var(--card-background)] rounded-2xl p-8 shadow-lg border border-[var(--accent-color)]">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
                哎呀！出現錯誤了
              </h1>
              <p className="text-[var(--text-secondary)] mb-6">
                很抱歉，應用程式遇到了意外錯誤。請嘗試重新載入頁面或聯繫技術支援。
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full bg-[var(--primary-color)] text-white py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  重試
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="w-full bg-[var(--accent-color)] text-[var(--text-primary)] py-3 px-6 rounded-xl font-medium hover:opacity-90 transition-opacity"
                >
                  回到首頁
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-6 text-left">
                  <details className="text-sm">
                    <summary className="text-[var(--text-secondary)] cursor-pointer mb-2">
                      開發者資訊 (僅開發環境顯示)
                    </summary>
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg overflow-auto">
                      <div className="text-red-600 dark:text-red-400 font-mono text-xs">
                        <div className="mb-2">
                          <strong>錯誤訊息:</strong><br />
                          {this.state.error.message}
                        </div>
                        <div className="mb-2">
                          <strong>錯誤堆疊:</strong><br />
                          <pre className="whitespace-pre-wrap">
                            {this.state.error.stack}
                          </pre>
                        </div>
                        {this.state.errorInfo && (
                          <div>
                            <strong>組件堆疊:</strong><br />
                            <pre className="whitespace-pre-wrap">
                              {this.state.errorInfo.componentStack}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary