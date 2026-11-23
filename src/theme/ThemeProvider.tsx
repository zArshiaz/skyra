import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material'

import { createAppTheme } from './theme'
import type { ColorMode } from './tokens'

const STORAGE_KEY = 'skyra-color-mode'

type ThemeContextValue = {
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode)
    document.documentElement.dataset.colorMode = mode
    document.documentElement.style.colorScheme = mode
  }, [mode])

  const theme = useMemo(() => createAppTheme(mode), [mode])
  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      setMode,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useAppTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useAppTheme must be used within AppThemeProvider.')
  return context
}
