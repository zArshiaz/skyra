import type { PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { I18nProvider } from '../i18n/I18nProvider'
import { AppThemeProvider } from '../theme/ThemeProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppThemeProvider>{children}</AppThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}
