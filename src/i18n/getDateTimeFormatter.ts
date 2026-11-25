import type { Language } from './i18n.types'

type DateTimeFormat =
  | 'localDate'
  | 'localTime'
  | 'weatherDate'
  | 'weatherTime'
  | 'weatherWeekday'
  | 'forecastWeekday'

export function getDateTimeFormatter(language: Language, format: DateTimeFormat) {
  const local = format === 'localDate' || format === 'localTime'
  const englishLocale = local ? 'en-GB' : 'en-US'
  const locale = language === 'fa' ? 'fa-IR-u-ca-persian-nu-latn' : englishLocale
  const options: Record<DateTimeFormat, Intl.DateTimeFormatOptions> = {
    localDate: { dateStyle: 'full' },
    localTime: { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' },
    weatherDate: { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' },
    weatherTime: { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' },
    weatherWeekday: { weekday: 'long', timeZone: 'UTC' },
    forecastWeekday: { weekday: language === 'fa' ? 'long' : 'short', timeZone: 'UTC' },
  }

  return new Intl.DateTimeFormat(locale, options[format])
}
