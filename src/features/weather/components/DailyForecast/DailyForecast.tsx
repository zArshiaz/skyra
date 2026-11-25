import { Alert, Box, Paper, Typography } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'
import { weatherCardColors } from '@/theme/tokens'
import { useAppTheme } from '@/theme/useAppTheme'
import type { DailyWeatherForecast } from '../../models/weather.model'
import { ForecastDayCard } from './ForecastDayCard'

type DailyForecastProps = {
  days: DailyWeatherForecast[]
  today: string
}

export function DailyForecast({ days, today }: DailyForecastProps) {
  const { language, t } = useI18n()
  const { mode } = useAppTheme()
  const colors = weatherCardColors[mode]
  const title = t('dashboard.forecastTitle')
  const weekday = new Intl.DateTimeFormat(language, { weekday: language === 'fa' ? 'long' : 'short', timeZone: 'UTC' })
  const temperature = new Intl.NumberFormat('en', { maximumFractionDigits: 0 })

  return (
    <Paper
      component="section"
      aria-label={title}
      elevation={0}
      sx={{
        bgcolor: colors.surface,
        color: colors.text,
        borderRadius: '16px',
        boxShadow: '0px 4px 10px 0px #00000026',
        overflow: 'hidden',
        pt: '24px',
        pb: '26px',
      }}
    >
      <Typography
        component="h2"
        sx={{ mx: '28px', mb: '30px', fontSize: 24, fontWeight: 500, lineHeight: '29px' }}
      >
        {title}
      </Typography>
      {days.length ? (
        <Box
          component="ul"
          aria-label={title}
          tabIndex={0}
          sx={{
            display: 'flex',
            gap: '18px',
            listStyle: 'none',
            m: 0,
            p: 0,
            pb:1,
            px: '28px',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
            '&:focus-visible': { outlineOffset: '-2px' },
          }}
        >
          {days.map((day) => (
            <ForecastDayCard
              key={day.date}
              day={day}
              label={day.date === today ? t('dashboard.today') : weekday.format(new Date(day.date))}
              temperature={temperature.format(day.averageTemperatureCelsius)}
            />
          ))}
        </Box>
      ) : (
        <Alert severity="info" sx={{ mx: '28px' }}>
          {t('dashboard.noForecastDays')}
        </Alert>
      )}
    </Paper>
  )
}
