import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AppTwo from './root-2/AppTwo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Второй набор компонентов
createRoot(document.getElementById('root-2')).render(
  <StrictMode>
    <AppTwo />
  </StrictMode>,
)
