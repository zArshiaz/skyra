import { useId } from 'react'
import { Alert, Box, Paper, Typography } from '@mui/material'
import { LineChart, lineClasses } from '@mui/x-charts/LineChart'

import { useI18n } from '@/i18n/useI18n'
import { weatherCardColors } from '@/theme/tokens'
import { useAppTheme } from '@/theme/useAppTheme'

import type { MonthlyTemperature } from '../../models/weather.model'
import { prepareMonthlyTemperatures } from './prepareMonthlyTemperatures'

type MonthlyTemperatureChartProps = { data: MonthlyTemperature[] }

const axisTickSpace = 12

export function MonthlyTemperatureChart({ data }: MonthlyTemperatureChartProps) {
  const { direction, language, t } = useI18n()
  const { mode } = useAppTheme()
  const rtl = direction === 'rtl'
  const gradientId = useId()
  const colors = weatherCardColors[mode]
  const title = t('dashboard.monthlyTemperature')
  const { temperatures, min, max } = prepareMonthlyTemperatures(data)
  const months =
    language === 'fa'
      ? [
          'فروردین',
          'اردیبهشت',
          'خرداد',
          'تیر',
          'مرداد',
          'شهریور',
          'مهر',
          'آبان',
          'آذر',
          'دی',
          'بهمن',
          'اسفند',
        ]
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <Paper
      component="section"
      elevation={0}
      sx={{
        bgcolor: colors.surface,
        borderRadius: '16px',
        boxShadow: '0px 4px 10px 0px #00000026',
        color: colors.text,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 234,
        minWidth: 0,
        p: 2,
      }}
    >
      <Typography component="h2" sx={{ fontSize: 18, fontWeight: 700, mb: 1 }}>
        {title}
      </Typography>
      {temperatures.every((value) => value === null) ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          {t('dashboard.noMonthlyTemperature')}
        </Alert>
      ) : (
        <Box dir="ltr" sx={{ width: '100%', minWidth: 0, my: 'auto' }}>
          <LineChart
            height={180}
            title={title}
            margin={{ top: 24, right: rtl ? 4 : 24, bottom: 0, left: rtl ? 24 : 4 }}
            grid={{ horizontal: true }}
            xAxis={[
              {
                scaleType: 'point',
                reverse: rtl,
                data: months,
                height: axisTickSpace + 28,
                tickLabelStyle: { fontSize: 10, fontWeight: 500 },
                disableLine: true,
                tickSize: axisTickSpace,
              },
            ]}
            yAxis={[
              {
                min,
                max,
                width: 56,
                position: rtl ? 'right' : 'left',
                tickLabelStyle: {
                  fontSize: 10,
                  fontWeight: 500,
                  direction: 'ltr',
                  textAnchor: rtl ? 'start' : 'end',
                },
                tickNumber: (max - min) / 10 + 1,
                valueFormatter: (value: number) => `${value}°C`,
                disableLine: true,
                tickSize: axisTickSpace,
              },
            ]}
            series={[
              {
                data: temperatures,
                area: true,
                baseline: 'min',
                curve: 'linear',
                showMark: false,
                valueFormatter: (value) => (value == null ? '' : `${value}°C`),
              },
            ]}
            sx={{
              '& .MuiChartsAxis-tick': { display: 'none' },
              [`& .${lineClasses.area}`]: { fill: `url(#${gradientId})`, opacity: 0.07 },
              [`& .${lineClasses.line}`]: { stroke: `url(#${gradientId})`, strokeWidth: 2 },
              '& .MuiChartsGrid-line': {
                stroke: colors.text,
                strokeOpacity: 0.35,
                strokeDasharray: '4 4',
              },
              '& .MuiChartsAxis-tickLabel': { fill: colors.text, fontSize: 10 },
            }}
          >
            <defs>
              <linearGradient id={gradientId}>
                <stop stopColor="#37d5dd" />
                <stop offset="1" stopColor="#8050ff" />
              </linearGradient>
            </defs>
          </LineChart>
        </Box>
      )}
    </Paper>
  )
}
