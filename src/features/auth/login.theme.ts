import { palette, type ColorMode } from '../../theme/tokens'

/**
 * Styling unique to the Login feature. Shared surfaces, borders and text
 * colors are provided by the global MUI theme.
 */
export const loginTheme = {
  light: {
    artworkSurface: palette.neutral[200],
    cardShadow: '0 4px 8px rgb(0 0 0 / 25%)',
    artworkShadowColor: '#12064366',
  },
  dark: {
    artworkSurface: palette.neutral[700],
    cardShadow: '0 4px 8px rgb(0 0 0 / 32%)',
    artworkShadowColor: '#12064366',
  },
} as const

export const getLoginTheme = (mode: ColorMode) => loginTheme[mode]
