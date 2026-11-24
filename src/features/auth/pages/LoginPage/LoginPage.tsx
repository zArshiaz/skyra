import { Box, Paper } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { LanguageSwitcher } from '@/shared/components/LanguageSwitcher/LanguageSwitcher'
import { ThemeSwitcher } from '@/shared/components/ThemeSwitcher/ThemeSwitcher'
import { useAppTheme } from '@/theme/useAppTheme'
import { saveUser } from '../../auth.storage'
import { LoginArtwork } from '../../components/LoginArtwork/LoginArtwork'
import { LoginForm } from '../../components/LoginForm/LoginForm'
import { getLoginTheme } from '../../login.theme'

export function LoginPage() {
  const navigate = useNavigate()
  const { mode } = useAppTheme()
  const colors = getLoginTheme(mode)

  const handleLogin = (name: string) => {
    saveUser({ name })
    navigate('/dashboard')
  }

  return (
    <Box
      component="main"
      sx={{
        display: 'grid',
        minHeight: '100vh',
        placeItems: 'center',
        px: { xs: 2, sm: 4 },
        py: { xs: 3, md: 4.5 },
      }}
    >
      <Box sx={{ position: 'fixed', top: { xs: 12, sm: 20 }, right: { xs: 12, sm: 20 } }}>
        <ThemeSwitcher />
      </Box>
      <Box sx={{ width: 'min(100%, 960px)' }}>
        <Paper
          elevation={0}
          sx={{
            display: 'grid',
            minHeight: { xs: 'auto', md: 560 },
            overflow: 'hidden',
            border: 1,
            borderColor: 'divider',
            borderRadius: '12px',
            boxShadow: colors.cardShadow,
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              bgcolor: 'background.paper',
              minHeight: { xs: 'auto', md: 560 },
              placeItems: 'center',
              px: { xs: 3, sm: 6 },
              py: { xs: 4, md: 12.75 },
            }}
          >
            <LoginForm onSubmit={handleLogin} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <LoginArtwork />
          </Box>
        </Paper>

        <Box sx={{ mt: { xs: 3, md: 5 }, mx: 'auto', width: 220 }}>
          <LanguageSwitcher />
        </Box>
      </Box>
    </Box>
  )
}
