import { Box } from '@mui/material'

import type { WeatherIllustrationProps } from './WeatherIllustration.types'

const artSize = 198

export function WeatherIllustration({
  left,
  right,
  shadowColor,
  src,
  top,
}: WeatherIllustrationProps) {
  return (
    <Box sx={{ position: 'absolute', top, left, right, width: artSize, height: artSize }}>
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          filter: 'blur(32px)',
          transform: 'translate(-12.8px, 51.21px)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            bgcolor: shadowColor,
            maskImage: `url(${src})`,
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
          }}
        />
      </Box>
      <Box
        alt=""
        component="img"
        src={src}
        sx={{ position: 'relative', width: artSize, height: artSize }}
      />
    </Box>
  )
}
