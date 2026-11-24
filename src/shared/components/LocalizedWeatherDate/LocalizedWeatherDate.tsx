import { Stack, Typography } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'

type LocalizedWeatherDateProps = {
  date: string
}

const toDate = (value: string) => new Date(value.includes('T') ? value : value.replace(' ', 'T'))

export function LocalizedWeatherDate({ date }: LocalizedWeatherDateProps) {
  const { language } = useI18n()
  const locale = language === 'fa' ? 'fa-IR-u-ca-persian' : 'en-US'
  const value = toDate(date)

  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(value)
  const calendarDate = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value)
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(value)

  return (
    <Stack spacing={0.5} sx={{ minHeight: 58 }}>
      <Typography component="p" sx={{ fontSize: 32, fontWeight: 500, lineHeight: 1 }}>
        {weekday}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 14, lineHeight: '26px' }}>
        {calendarDate} · {time}
      </Typography>
    </Stack>
  )
}
