import { Box, Button, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { useI18n } from '@/i18n/useI18n'
import { getStoredUser } from '@/features/auth'
import { DashboardHeader } from '../../components/DashboardHeader/DashboardHeader'

export function DashboardPlaceholder() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const user = getStoredUser()

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <DashboardHeader />
      <Box component="main" sx={{ display: 'grid', minHeight: 'calc(100vh - 80px)', placeItems: 'center', p: 3 }}>
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
    </Box>
  )
}
