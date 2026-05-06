import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

function mountPortal() {
  const staticRoot = document.getElementById('root')
  const reactRoot = document.getElementById('react-root')

  if (!staticRoot || !reactRoot) {
    console.error('CODASOL portal mount skipped: required root element was not found.')
    return
  }

  try {
    ReactDOM.createRoot(reactRoot).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } catch (error) {
    console.error('CODASOL portal React mount failed. Static content remains visible.', error)
  }
}

mountPortal()
