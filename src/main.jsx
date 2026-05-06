import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

function shouldStartAtTop() {
  return !window.location.hash
}

function scrollToPortalTop() {
  if (!shouldStartAtTop()) {
    return
  }

  const previousScrollBehavior = document.documentElement.style.scrollBehavior
  document.documentElement.style.scrollBehavior = 'auto'
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  document.documentElement.style.scrollBehavior = previousScrollBehavior
}

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

scrollToPortalTop()
window.addEventListener('load', scrollToPortalTop, { once: true })
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    scrollToPortalTop()
  }
})

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
