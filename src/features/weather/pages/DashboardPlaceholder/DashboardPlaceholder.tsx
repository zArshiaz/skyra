import { Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useI18n } from '@/i18n/useI18n'
import { getStoredUser } from '@/features/auth'

export function DashboardPlaceholder() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const user = getStoredUser()

  return (
    <Box component="main" sx={{ display: 'grid', minHeight: '100vh', placeItems: 'center', p: 3 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">
          {t('dashboard.welcome').replace('{name}', user?.name ?? '')}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {t('dashboard.description')}
        </Typography>
        <Button sx={{ mt: 3 }} variant="outlined" onClick={() => navigate('/login')}>
          {t('dashboard.backToLogin')}
        </Button>
      </Paper>
    </Box>
  )
}
