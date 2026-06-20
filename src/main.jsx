import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TermsPage from './TermsPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ textAlign: 'center', color: '#F5F5F0', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
            <p style={{ color: '#9CA3AF', marginBottom: 20 }}>Please refresh the page to try again.</p>
            <button onClick={() => window.location.reload()} style={{ background: '#F7931A', border: 'none', borderRadius: 8, padding: '12px 24px', color: '#000', fontWeight: 600, cursor: 'pointer' }}>
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function Router() {
  const [page, setPage] = React.useState('home')

  React.useEffect(() => {
    const handlePop = () => setPage('home')
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (to) => {
    window.scrollTo(0, 0)
    setPage(to)
  }

  if (page === 'terms') return <TermsPage onBack={() => navigate('home')} />
  if (page === 'privacy') return <PrivacyPage onBack={() => navigate('home')} />
  return <App onNavigate={navigate} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </React.StrictMode>,
)
