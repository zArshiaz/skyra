export type Language = 'en' | 'fa'

export type TranslationKey =
  | 'dashboard.backToLogin'
  | 'dashboard.description'
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
