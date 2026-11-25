import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'

import { conditionText } from '../../i18n/conditionText'
import { useI18n } from '@/i18n/useI18n'
import { weatherCardColors } from '@/theme/tokens'
import { useAppTheme } from '@/theme/useAppTheme'
import type { WeatherForecast } from '../../models/weather.model'
import { LocalizedWeatherDate } from '@/shared/components/LocalizedWeatherDate/LocalizedWeatherDate'

type TodayWeatherCardProps = {
  weather: WeatherForecast
}

export function TodayWeatherCard({ weather }: TodayWeatherCardProps) {
  const { language, t } = useI18n()
  const { mode } = useAppTheme()
  const today = weather.daily[0]
  const persian = language === 'fa'
  const condition = conditionText(weather.current.condition, language, weather.current.isDay)
  const feelsLike = Math.round(weather.current.feelsLikeCelsius)
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
        gridTemplateColumns: { xs: 'minmax(0, 1fr)', sm: 'fit-content(50%) minmax(0, 1fr)' },
        minHeight: 234,
        overflow: 'hidden',
        p: '20px 24px',
        width: '100%',
      }}
    >
      <Stack
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={0}
        sx={{ height: '100%', minHeight: 193, minWidth: 0 }}
      >
        <Chip
          icon={<LocationOnOutlinedIcon />}
          label={weather.location.name}
          title={weather.location.name}
          sx={{
            '& .MuiChip-icon': { color: 'inherit' },
            px: 1,
            fontSize: '1rem',
            bgcolor: colors.chip,
            borderRadius: '50px',
            color: colors.chipText,
            height: 40,
            maxWidth: '100%',
          }}
        />
        <LocalizedWeatherDate date={weather.location.localTime} />
        <Box sx={{ minHeight: 63 }}>
          <Typography
            component="p"
            sx={{ color: colors.text, fontSize: 40, fontWeight: 500, lineHeight: 1 }}
          >
            <bdi dir="ltr">
              {Math.round(weather.current.temperatureCelsius)}°{persian ? ' C' : 'C'}
            </bdi>
          </Typography>
          {today ? (
            <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: '18px', mt: 0.5 }}>
              {t('dashboard.high')}: <bdi dir="ltr">{Math.round(today.temperatureMaxCelsius)}°</bdi>{' '}
              · {t('dashboard.low')}:{' '}
              <bdi dir="ltr">{Math.round(today.temperatureMinCelsius)}°</bdi>
            </Typography>
          ) : null}
        </Box>
      </Stack>

      <Stack
        alignItems={persian ? 'flex-start' : 'end'}
        justifyContent="center"
        spacing={1}
        sx={
          persian
            ? { justifySelf: 'end', width: 'max-content', maxWidth: '100%', minWidth: 0 }
            : undefined
        }
      >
        <Box
          alt={condition}
          component="img"
          src={weather.current.condition.iconUrl}
          sx={{
            height: 129,
            maxWidth: '100%',
            objectFit: 'contain',
            width: 187,
            transform: 'scale(1.4) translateY(-5px)',
          }}
        />
        <Typography
          sx={{
            color: colors.text,
            fontSize: 32,
            fontWeight: 400,
            lineHeight: 1.2,
            maxWidth: '100%',
          }}
        >
          {condition}
        </Typography>
        <Typography sx={{ color: colors.text, fontSize: 16, lineHeight: '18px' }}>
          {t('dashboard.feelsLike').replace('{temperature}', String(feelsLike))}
        </Typography>
      </Stack>
    </Paper>
  )
}
