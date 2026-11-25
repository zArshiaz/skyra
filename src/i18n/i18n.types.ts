export type Language = 'en' | 'fa'

export type TranslationKey =
  | 'dashboard.contact'
  | 'dashboard.copyright'
  | 'dashboard.forecastTitle'
  | 'dashboard.today'
  | 'dashboard.noForecastDays'
  | 'dashboard.monthlyTemperature'
  | 'dashboard.noMonthlyTemperature'
  | 'dashboard.backToLogin'
  | 'dashboard.description'
  | 'dashboard.setting'
  | 'dashboard.exit'
  | 'dashboard.feelsLike'
  | 'dashboard.high'
  | 'dashboard.language'
  | 'dashboard.lightMode'
  | 'dashboard.darkMode'
  | 'dashboard.location'
  | 'dashboard.mode'
  | 'dashboard.noLocationsFound'
  | 'dashboard.low'
  | 'dashboard.searchingLocations'
  | 'dashboard.locationSearchError'
  | 'dashboard.title'
  | 'dashboard.loadingWeather'
  | 'dashboard.locationRequired'
  | 'dashboard.weatherError'
  | 'dashboard.welcome'
  | 'language.english'
  | 'language.label'
  | 'language.persian'
  | 'login.namePlaceholder'
  | 'login.nameRequired'
  | 'login.submit'
  | 'login.title'
  | 'theme.useDark'
  | 'theme.useLight'

export type Translations = Record<TranslationKey, string>

export type I18nContextValue = {
  direction: 'ltr' | 'rtl'
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey) => string
}
