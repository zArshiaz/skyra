import { Box, Stack, Typography } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'
import { conditionText } from '../../i18n/conditionText'
import { weatherCardColors } from '@/theme/tokens'
import { useAppTheme } from '@/theme/useAppTheme'
import type { DailyWeatherForecast } from '../../models/weather.model'

type ForecastDayCardProps = {
  day: DailyWeatherForecast
  label: string
  temperature: string
}

export function ForecastDayCard({ day, label, temperature }: ForecastDayCardProps) {
  const { language } = useI18n()
  const { mode } = useAppTheme()

  return (
    <Stack
      component="li"
      alignItems="center"
      justifyContent="center"
      sx={{
        bgcolor: weatherCardColors[mode].forecastDay,
        borderRadius: '24px',
        flex: '0 0 104px',
        height: 266,
        p: '22px 16px',
        gap: '24px',
      }}
    >
      <Typography
        component="time"
        dateTime={day.date}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          textAlign: 'center',
          '&::after': {
            content: '""',
            display: 'block',
            width: 60,
            height: '2px',
            mt: 1,
            background: 'linear-gradient(90deg, transparent, currentColor, transparent)',
            opacity: 0.4,
          },
        }}
      >
        {label}
      </Typography>
      <Box
        component="img"
        src={day.condition.iconUrl}
        alt={conditionText(day.condition, language, true)}
        sx={{ width: 72, height: 72, objectFit: 'contain' }}
      />
      <Typography dir="ltr" sx={{ fontSize: 18, fontWeight: 500 }}>
        {temperature}°C
      </Typography>
    </Stack>
  )
}
