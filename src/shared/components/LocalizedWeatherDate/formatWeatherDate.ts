import { getDateTimeFormatter } from '@/i18n/getDateTimeFormatter'
import type { Language } from '@/i18n/i18n.types'

export function formatWeatherDate(date: string, language: Language) {
  // Preserve the city's wall-clock time when the API omits a timezone.
  const dateTime = date.replace(' ', 'T').replace(/T(\d):/, 'T0$1:')
  const hasOffset = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(dateTime)
  const value = new Date(hasOffset ? dateTime : dateTime + 'Z')
  const weekday = getDateTimeFormatter(language, 'weatherWeekday').format(value)
  const calendarDate = getDateTimeFormatter(language, 'weatherDate').format(value)
  const time = getDateTimeFormatter(language, 'weatherTime').format(value)

  return {
    dateTime,
    weekday,
    details: language === 'fa' ? [time, calendarDate] : [calendarDate, time],
  }
}
