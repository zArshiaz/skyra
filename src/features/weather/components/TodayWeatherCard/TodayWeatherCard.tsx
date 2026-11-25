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
        gridTemplateColumns: { xs: 'minmax(0, 6fr) minmax(0, 5fr)', sm: 'fit-content(50%) minmax(0, 1fr)' },
        columnGap: { xs: 1.5, sm: 0 },
        minHeight: { xs: 196, sm: 234 },
        overflow: 'hidden',
        p: { xs: 2, sm: '20px 24px' },
        width: '100%',
      }}
    >
      <Stack
        alignItems="flex-start"
        justifyContent="space-between"
        spacing={0}
        sx={{ height: '100%', minHeight: { xs: 160, sm: 193 }, gap: { xs: 1.5, sm: 0 }, minWidth: 0 }}
      >
        <Chip
          icon={<LocationOnOutlinedIcon />}
          label={weather.location.name}
          title={weather.location.name}
          sx={{
            '& .MuiChip-icon': { color: 'inherit' },
            px: 1,
            fontSize: { xs: 14, sm: 16 },
            bgcolor: colors.chip,
            borderRadius: '50px',
            color: colors.chipText,
            height: { xs: 32, sm: 40 },
            maxWidth: '100%',
          }}
        />
        <LocalizedWeatherDate date={weather.location.localTime} />
        <Box sx={{ minHeight: { xs: 'auto', sm: 63 } }}>
          <Typography
            component="p"
            sx={{ color: colors.text, fontSize: { xs: 32, sm: 40 }, fontWeight: 500, lineHeight: 1 }}
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
        sx={{
          minWidth: 0,
          maxWidth: '100%',
          overflowWrap: 'anywhere',
          ...(persian && { justifySelf: 'end', width: 'max-content' }),
        }}
      >
        <Box
          alt={condition}
          component="img"
          src={weather.current.condition.iconUrl}
          sx={{
            height: { xs: 76, sm: 129 },
            maxWidth: '100%',
            objectFit: 'contain',
            width: { xs: 84, sm: 187 },
            transform: { sm: 'scale(1.4) translateY(-5px)' },
          }}
        />
        <Typography
          sx={{
            color: colors.text,
            fontSize: { xs: 20, sm: 32 },
            fontWeight: 400,
            lineHeight: 1.2,
            maxWidth: '100%',
          }}
        >
          {condition}
        </Typography>
        <Typography sx={{ color: colors.text, fontSize: { xs: 14, sm: 16 }, lineHeight: '18px' }}>
          {t('dashboard.feelsLike').replace('{temperature}', String(feelsLike))}
        </Typography>
      </Stack>
    </Paper>
  )
}
