import type { ColorMode } from './tokens'

export type ThemeContextValue = {
  mode: ColorMode
  setMode: (mode: ColorMode) => void
  toggleMode: () => void
}
