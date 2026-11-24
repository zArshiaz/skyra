import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'

import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'

import { useI18n } from '../i18n/useI18n'
import { ThemeContext } from './ThemeContext'
import { ltrEmotionCache, rtlEmotionCache } from './emotionCache'
import { createAppTheme } from './theme'
import type { ColorMode } from './tokens'
import type { ThemeContextValue } from './ThemeProvider.types'

const STORAGE_KEY = 'skyra-color-mode'

const storedMode = (): ColorMode | null => {
  const value = localStorage.getItem(STORAGE_KEY)
  return value === 'light' || value === 'dark' ? value : null
}

const initialMode = (): ColorMode => {
  const documentMode = document.documentElement.dataset.colorMode
  if (documentMode === 'light' || documentMode === 'dark') return documentMode

  return storedMode() ?? 'light'
}

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [mode, setMode] = useState<ColorMode>(initialMode)
  const { direction } = useI18n()

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
    document.documentElement.dataset.colorMode = mode
    document.documentElement.style.colorScheme = mode
  }, [mode])

  const theme = useMemo(() => createAppTheme(mode, direction), [direction, mode])
  const emotionCache = direction === 'rtl' ? rtlEmotionCache : ltrEmotionCache
  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContext.Provider value={value}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ThemeContext.Provider>
    </CacheProvider>
  )
}
