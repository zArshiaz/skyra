import { IconButton, Tooltip } from '@mui/material'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'

import { useI18n } from '@/i18n/useI18n'
import { useAppTheme } from '@/theme/useAppTheme'

export function ThemeSwitcher() {
  const { mode, toggleMode } = useAppTheme()
  const { t } = useI18n()
  const isDark = mode === 'dark'

  return (
    <Tooltip title={t(isDark ? 'theme.useLight' : 'theme.useDark')}>
      <IconButton aria-label="Toggle color mode" color="info" onClick={toggleMode}>
        {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
      </IconButton>
    </Tooltip>
  )
}
