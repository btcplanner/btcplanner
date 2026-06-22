import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TermsPage from './TermsPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'
import BlogPage from './BlogPage.jsx'

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
        <div style={{ minHeight: '100vh', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ textAlign: 'center', color: '#1D1D1B', fontFamily: 'sans-serif' }} role="alert">
            <h1 style={{ fontSize: 24, marginBottom: 12 }}>Something went wrong</h1>
            <p style={{ color: '#6B7280', marginBottom: 20 }}>Please refresh the page to try again.</p>
            <button onClick={() => window.location.reload()} style={{ background: '#F7931A', border: 'none', borderRadius: 8, padding: '12px 24px', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              Refresh
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function getPageFromPath(pathname) {
  if (pathname === '/blog') return 'blog';
  if (pathname.startsWith('/blog/')) return pathname.slice(1);
  if (pathname === '/terms') return 'terms';
  if (pathname === '/privacy') return 'privacy';
  return 'home';
}

function Router() {
  const [page, setPage] = React.useState(() => getPageFromPath(window.location.pathname))

  React.useEffect(() => {
    const handlePop = () => {
      setPage(getPageFromPath(window.location.pathname))
    }
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (to) => {
    window.scrollTo(0, 0)
    const path = to === 'home' ? '/' : `/${to}`
    window.history.pushState(null, '', path)
    setPage(to)
  }

  if (page === 'terms') return <TermsPage onBack={() => navigate('home')} />
  if (page === 'privacy') return <PrivacyPage onBack={() => navigate('home')} />
  if (page === 'blog') return <BlogPage slug={null} onNavigate={navigate} />
  if (page.startsWith('blog/')) {
    const slug = page.slice(5)
    return <BlogPage slug={slug} onNavigate={navigate} />
  }
  return <App onNavigate={navigate} />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  </React.StrictMode>,
)
