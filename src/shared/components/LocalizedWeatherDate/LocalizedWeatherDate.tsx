import { Box, Stack, Typography } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'

type LocalizedWeatherDateProps = {
  date: string
}

export function LocalizedWeatherDate({ date }: LocalizedWeatherDateProps) {
  const { language } = useI18n()
  const persian = language === 'fa'
  const locale = persian ? 'fa-IR-u-ca-persian-nu-latn' : 'en-US'
  // WeatherAPI supplies the city's wall-clock time, sometimes with a single-digit hour.
  const isoLocal = date.replace(' ', 'T').replace(/T(\d):/, 'T0$1:')
  const hasOffset = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(isoLocal)
  const value = new Date(hasOffset ? isoLocal : isoLocal + 'Z')
  const format = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' }).format(value)

  const weekday = format({ weekday: 'long' })
  const calendarDate = format({ day: 'numeric', month: 'short', year: 'numeric' })
  const time = format({ hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <Stack spacing={0.5} sx={{ minHeight: 58 }}>
      <Typography component="p" sx={{ fontSize: 32, fontWeight: 500, lineHeight: 1 }}>
        {weekday}
      </Typography>
      <Box
        component="time"
        dateTime={isoLocal}
        sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 2, fontSize: 14, color: 'inherit' }}
      >
        <span>{persian ? time : calendarDate}</span>
        <span>{persian ? calendarDate : time}</span>
      </Box>
    </Stack>
  )
}
