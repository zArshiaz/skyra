import { Box, CircularProgress, Typography } from '@mui/material'

type LoadingStateProps = {
  label?: string
}

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <Box aria-live="polite" role="status" sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 1.5, py: 6 }}>
      <CircularProgress aria-label={label ?? 'Loading'} size={32} />
      {label ? <Typography color="text.secondary">{label}</Typography> : null}
    </Box>
  )
}
