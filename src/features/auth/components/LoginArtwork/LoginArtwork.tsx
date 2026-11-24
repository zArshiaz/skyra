import { Box } from '@mui/material'

import { useAppTheme } from '@/theme/useAppTheme'
import moonCloudFog from '../../../../assets/weather/moon-cloud-fog.png'
import moonCloudWind from '../../../../assets/weather/moon-cloud-wind.png'
import sunCloudRain from '../../../../assets/weather/sun-cloud-rain.png'
import { getLoginTheme } from '../../login.theme'
import { WeatherIllustration } from '../WeatherIllustration/WeatherIllustration'

export function LoginArtwork() {
  const { mode } = useAppTheme()
  const { artworkShadowColor, artworkSurface } = getLoginTheme(mode)

  return (
    <Box
      aria-hidden="true"
      sx={{ position: 'relative', minHeight: 560, overflow: 'hidden', bgcolor: artworkSurface }}
    >
      <WeatherIllustration
        left={35}
        shadowColor={artworkShadowColor}
        src={sunCloudRain as string}
        top={162}
      />
      <WeatherIllustration
        right={35}
        shadowColor={artworkShadowColor}
        src={moonCloudFog as string}
        top={56}
      />
      <WeatherIllustration
        right={35}
        shadowColor={artworkShadowColor}
        src={moonCloudWind as string}
        top={302}
      />
    </Box>
  )
}
