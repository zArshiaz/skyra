import { Box, Stack, Typography } from '@mui/material'

import { formatWeatherDate } from './formatWeatherDate'
import { useI18n } from '@/i18n/useI18n'

type LocalizedWeatherDateProps = {
  date: string
}

export function LocalizedWeatherDate({ date }: LocalizedWeatherDateProps) {
  const { language } = useI18n()
  const { dateTime, weekday, details } = formatWeatherDate(date, language)

  return (
    <Stack spacing={0.5} sx={{ minHeight: { xs: 'auto', sm: 58 } }}>
      <Typography component="p" sx={{ fontSize: { xs: 24, sm: 32 }, fontWeight: 500, lineHeight: 1 }}>
        {weekday}
      </Typography>
      <Box
        component="time"
        dateTime={dateTime}
        sx={{ display: 'flex', flexWrap: 'wrap', columnGap: { xs: 1, sm: 2 }, fontSize: { xs: 13, sm: 14 }, color: 'inherit' }}
      >
        {details.map((detail, index) => (
          <span key={index}>{detail}</span>
        ))}
      </Box>
    </Stack>
  )
}
