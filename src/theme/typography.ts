import type { TypographyVariantsOptions } from '@mui/material/styles'

/**
 * Shared type scale derived from the Figma component set.
 * Roboto is the primary Latin/UI face; Vazirmatn covers Persian content.
 */
export const appTypography: TypographyVariantsOptions = {
  fontFamily: 'Roboto, Vazirmatn, Arial, sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.25 },
  h3: { fontSize: '25.63px', fontWeight: 700, lineHeight: 1 },
  h4: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35 },
  h5: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.5 },
  h6: { fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.5 },
  body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.15px' },
  body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.43, letterSpacing: '0.17px' },
  caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.5, letterSpacing: '0.4px' },
  overline: { fontSize: '0.625rem', fontWeight: 500, lineHeight: 1.5, letterSpacing: '0.5px' },
  button: {
    fontSize: '0.9375rem',
    fontWeight: 500,
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'uppercase',
  },
}
