import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'
import { weatherCardColors } from '@/theme/tokens'
import { useAppTheme } from '@/theme/useAppTheme'
import type { WeatherForecast } from '../../models/weather.model'
import { LocalizedWeatherDate } from '@/shared/components/LocalizedWeatherDate/LocalizedWeatherDate'

type TodayWeatherCardProps = {
  weather: WeatherForecast
}

export function TodayWeatherCard({ weather }: TodayWeatherCardProps) {
  const { t } = useI18n()
  const { mode } = useAppTheme()
  const today = weather.daily[0]
  const colors = weatherCardColors[mode]

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        bgcolor: colors.surface,
        borderRadius: '16px',
        boxShadow: '0px 4px 10px 0px #00000026',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '203px 187px' },
        justifyContent: 'space-between',
        minHeight: 234,
        overflow: 'hidden',
        p: '20px 24px',
        width: 'min(100%, 607px)',
      }}
    >
      <Stack
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={0}
        sx={{ height: '100%', minHeight: 193 }}
      >
        <Chip
          icon={<LocationOnOutlinedIcon />}
          label={weather.location.name}
          sx={{
            '& .MuiChip-icon': { color: 'inherit' },
            px: 1,
            fontSize: '1rem',
            bgcolor: colors.chip,
            borderRadius: '50px',
            color: colors.chipText,
            height: 40,
          }}
        />
        <LocalizedWeatherDate date={weather.location.localTime} />
        <Box sx={{ minHeight: 63 }}>
          <Typography
            component="p"
            sx={{ color: colors.text, fontSize: 40, fontWeight: 500, lineHeight: 1 }}
          >
            {Math.round(weather.current.temperatureCelsius)}°C
          </Typography>
          {today ? (
            <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: '18px', mt: 0.5 }}>
              {t('dashboard.high')}: {Math.round(today.temperatureMaxCelsius)}° ·{' '}
              {t('dashboard.low')}: {Math.round(today.temperatureMinCelsius)}°
            </Typography>
          ) : null}
        </Box>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{ minWidth: 0, textAlign: 'center' }}
      >
        <Box
          alt={weather.current.condition.text}
          component="img"
          src={weather.current.condition.iconUrl}
          sx={{ height: 129, maxWidth: '100%', objectFit: 'contain', width: 187 }}
        />
        <Typography
          noWrap
          sx={{ color: colors.text, fontSize: 32, fontWeight: 400, lineHeight: 1.2 }}
        >
          {weather.current.condition.text}
        </Typography>
        <Typography sx={{ color: colors.text, fontSize: 16, lineHeight: '18px' }}>
          {t('dashboard.feelsLike')} {Math.round(weather.current.feelsLikeCelsius)}°C
        </Typography>
      </Stack>
    </Paper>
  )
}
