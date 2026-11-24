import { FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from '@mui/material'

import type { Language } from '@/i18n/i18n.types'
import { useI18n } from '@/i18n/useI18n'

const languageSelectId = 'language-select'
const languageSelectLabelId = `${languageSelectId}-label`

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n()

  const handleLanguageChange = (event: SelectChangeEvent<Language>) => {
    setLanguage(event.target.value)
  }

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id={languageSelectLabelId}>{t('language.label')}</InputLabel>
      <Select<Language>
        id={languageSelectId}
        labelId={languageSelectLabelId}
        onChange={handleLanguageChange}
        variant="standard"
        value={language}
      >
        <MenuItem value="en">{t('language.english')}</MenuItem>
        <MenuItem value="fa">{t('language.persian')}</MenuItem>
      </Select>
    </FormControl>
  )
}
