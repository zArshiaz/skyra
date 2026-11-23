import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { AppThemeProvider } from './theme/ThemeProvider'

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </StrictMode>,
)
