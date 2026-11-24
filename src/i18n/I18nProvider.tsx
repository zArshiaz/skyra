import { useEffect, useMemo, useState, type PropsWithChildren } from 'react'

import { I18nContext } from './I18nContext'
import { en } from './locales/en'
import { fa } from './locales/fa'
import type { I18nContextValue, Language, TranslationKey } from './i18n.types'

const STORAGE_KEY = 'skyra-language'
const translations = { en, fa } as const
const directions = { en: 'ltr', fa: 'rtl' } as const

const initialLanguage = (): Language => {
  const storedLanguage = localStorage.getItem(STORAGE_KEY)
  if (storedLanguage === 'fa' || storedLanguage === 'en') return storedLanguage

  const documentLanguage = document.documentElement.lang
  return documentLanguage === 'fa' ? 'fa' : 'en'
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(initialLanguage)
  const direction = directions[language]

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language)
    document.documentElement.lang = language
    document.documentElement.dir = direction
  }, [direction, language])

  const value = useMemo<I18nContextValue>(
    () => ({
      direction,
      language,
      setLanguage,
      t: (key: TranslationKey) => translations[language][key],
    }),
    [direction, language],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
