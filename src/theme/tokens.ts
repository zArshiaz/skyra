/**
 * Color primitives transcribed from the supplied Figma palette.
 *
 * Components should consume the semantic colors below rather than using these
 * raw values directly. That keeps the UI consistent and makes theme changes
 * safe.
 */
export const palette = {
  neutral: {
    50: '#FFFFFF',
    100: '#F5F9FC',
    200: '#E1E9EE',
    300: '#CDD9E0',
    400: '#AFBCC4',
    500: '#B895A0',
    600: '#62707C',
    700: '#3D4852',
    800: '#25262E',
    900: '#1C1B22',
    A100: '#96AAB5',
    A200: '#3F6A81',
    A400: '#373E46',
    A700: '#0C0C0C',
  },
  primary: {
    50: '#E0FAFF',
    100: '#CFEDFA',
    200: '#98D8F1',
    300: '#57C0E9',
    400: '#19ABE4',
    500: '#009CD8',
    600: '#0F6FA6',
    700: '#10598E',
    800: '#074979',
    900: '#003464',
    A100: '#82FBFF',
    A200: '#44DDFF',
    A400: '#29B2FF',
    A700: '#298BFF',
  },
  error: {
    50: '#FFEBEE',
    100: '#FFCDD2',
    200: '#EF9A9A',
    300: '#E57373',
    400: '#EF5350',
    500: '#F44336',
    600: '#E53935',
    700: '#D32F2F',
    800: '#C62828',
    900: '#B71C1C',
    A100: '#FF8A80',
    A200: '#FF5252',
    A400: '#FF1744',
    A700: '#D50000',
  },
  warning: {
    50: '#FFF3E0',
    100: '#FFE0B2',
    200: '#FFCC80',
    300: '#FFB74D',
    400: '#FFA726',
    500: '#FF9800',
    600: '#FB8C00',
    700: '#F57C00',
    800: '#EF6C00',
    900: '#E65100',
    A100: '#FFD180',
    A200: '#FFAB40',
    A400: '#FF9100',
    A700: '#FF6D00',
  },
  success: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1B5E20',
    A100: '#B9F6CA',
    A200: '#69F0AE',
    A400: '#00E676',
    A700: '#00C853',
  },
  info: {
    50: '#E3F2FD',
    100: '#BBDEFB',
    200: '#90CAF9',
    300: '#64B5F6',
    400: '#42A5F5',
    500: '#2196F3',
    600: '#1E88E5',
    700: '#1976D2',
    800: '#1565C0',
    900: '#0D47A1',
    A100: '#82B1FF',
    A200: '#448AFF',
    A400: '#2979FF',
    A700: '#2962FF',
  },
} as const

/** Colors used by components: cards, text, dividers, actions and feedback. */
export const semanticColors = {
  light: {
    background: { canvas: palette.neutral[100], surface: palette.neutral[50] },
    text: {
      primary: palette.neutral[900],
      secondary: palette.neutral[600],
      inverse: palette.neutral[50],
    },
    border: palette.neutral[200],
    action: { hover: palette.primary[50], selected: palette.primary[100] },
    primary: {
      main: palette.primary[500],
      light: palette.primary[200],
      dark: palette.primary[700],
      contrastText: palette.neutral[50],
    },
  },
  dark: {
    background: { canvas: palette.neutral[900], surface: palette.neutral[800] },
    text: {
      primary: palette.neutral[50],
      secondary: palette.neutral[300],
      inverse: palette.neutral[900],
    },
    border: palette.neutral[700],
    action: { hover: palette.primary[900], selected: palette.primary[800] },
    primary: {
      main: palette.primary[300],
      light: palette.primary[100],
      dark: palette.primary[600],
      contrastText: palette.neutral[900],
    },
  },
  feedback: {
    error: palette.error[500],
    warning: palette.warning[500],
    success: palette.success[500],
    info: palette.info[500],
  },
} as const

/** Semantic colors for the weather dashboard cards. */
export const weatherCardColors = {
  light: {
    chip: palette.neutral[300],
    chipText: palette.primary[900],
    surface: palette.neutral[200],
    text: palette.primary[900],
  },
  dark: {
    chip: palette.neutral[200],
    chipText: palette.neutral[700],
    surface: '#2B344B',
    text: '#F3F4F7',
  },
} as const

export type ColorMode = 'light' | 'dark'
