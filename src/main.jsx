import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

class RootErrorBoundary extends React.Component {
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
        <main style={{ padding: '1.5rem', fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif' }}>
          <h1 style={{ margin: 0, color: '#7a1122' }}>CODASOL Investor Introduction Portal</h1>
          <p style={{ marginTop: '0.75rem', color: '#4f4f58' }}>
            The portal content is temporarily unavailable. Please refresh the page or contact investor@codasol.com.
          </p>
        </main>
      )
    }

    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <RootErrorBoundary>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RootErrorBoundary>
)
