import { useState, type FormEvent } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'
import type { LoginFormProps } from './LoginForm.types'

export function LoginForm({ onSubmit }: LoginFormProps) {
  const { t } = useI18n()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const normalizedName = name.trim()

    if (!normalizedName) {
      setError(t('login.nameRequired'))
      return
    }

    onSubmit(normalizedName)
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        minHeight: { xs: 'auto', md: 355 },
        width: 'min(100%, 386px)',
        flexDirection: 'column',
      }}
    >
      <Typography
        align="center"
        component="h1"
        variant="h3"
        sx={{
          display: 'grid',
          height: 44,
          marginBottom: 4,
          placeItems: 'center',
        }}
      >
        {t('login.title')}
      </Typography>
      <TextField
        autoComplete="name"
        error={Boolean(error)}
        fullWidth
        helperText={error || ' '}
        onChange={(event) => {
          setName(event.target.value)
          if (error) setError('')
        }}
        placeholder={t('login.namePlaceholder')}
        size="small"
        value={name}
      />
      <Box sx={{ flexGrow: { xs: 0, md: 1 }, minHeight: { xs: 5, md: 0 } }} />
      <Button fullWidth color="primary" size="small" type="submit" variant="contained">
        {t('login.submit')}
      </Button>
    </Box>
  )
}
