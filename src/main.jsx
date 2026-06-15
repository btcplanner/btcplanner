import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import TermsPage from './TermsPage.jsx'
import PrivacyPage from './PrivacyPage.jsx'

function Router() {
  const [page, setPage] = React.useState('home')

  // Handle browser back button
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
    <Router />
  </React.StrictMode>,
)
