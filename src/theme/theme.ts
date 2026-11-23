import { createTheme, type PaletteMode } from '@mui/material/styles'

import { palette, semanticColors, type ColorMode } from './tokens'

const themeColors = (mode: ColorMode) => semanticColors[mode]

export const createAppTheme = (mode: PaletteMode) => {
  const colors = themeColors(mode)

  return createTheme({
    palette: {
      mode,
      primary: colors.primary,
      secondary: {
        main: palette.info[500],
        light: palette.info[200],
        dark: palette.info[700],
        contrastText: palette.neutral[50],
      },
      error: { main: palette.error[500], light: palette.error[200], dark: palette.error[700] },
      warning: {
        main: palette.warning[500],
        light: palette.warning[200],
        dark: palette.warning[700],
      },
      success: {
        main: palette.success[500],
        light: palette.success[200],
        dark: palette.success[700],
      },
      info: { main: palette.info[500], light: palette.info[200], dark: palette.info[700] },
      background: {
        default: colors.background.canvas,
        paper: colors.background.surface,
      },
      text: colors.text,
      divider: colors.border,
      action: {
        hover: colors.action.hover,
        selected: colors.action.selected,
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: 'Inter, Vazirmatn, system-ui, sans-serif',
      button: { fontWeight: 700, textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: { transition: 'background-color 160ms ease, color 160ms ease' },
        },
      },
      MuiPaper: {
        styleOverrides: { root: { backgroundImage: 'none' } },
      },
      MuiButton: {
        styleOverrides: { root: { borderRadius: 10 } },
      },
    },
  })
}
