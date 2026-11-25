import { useEffect, useRef, useState, type MouseEvent, type SyntheticEvent } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Paper,
  Popover,
  type PopoverActions,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

import logo from '@/assets/branding/weather-logo.png'
import { clearStoredUser } from '@/features/auth/auth.storage'
import { useI18n } from '@/i18n/useI18n'
import { useAppTheme } from '@/theme/useAppTheme'
import { useWeatherLocationSearch } from '../../hooks/useWeatherLocationSearch'
import type { LocationSearchResult } from '../../models/weather.model'

type DashboardHeaderProps = {
  onLocationChange: (location: LocationSearchResult | null) => void
  selectedLocation: LocationSearchResult | null
}

export function DashboardHeader({ onLocationChange, selectedLocation }: DashboardHeaderProps) {
  const [settingsAnchor, setSettingsAnchor] = useState<HTMLButtonElement | null>(null)
  const [locationInput, setLocationInput] = useState(selectedLocation?.name ?? '')
  const [locationQuery, setLocationQuery] = useState('')
  const popoverAction = useRef<PopoverActions>(null)
  const { direction, language, setLanguage, t } = useI18n()
  const { mode, setMode } = useAppTheme()
  const navigate = useNavigate()
  const menuEdge = direction === 'rtl' ? 'left' : 'right'
  const isSettingsOpen = Boolean(settingsAnchor)
  const { error: locationSearchError, isLoading: isSearchingLocations, locations } = useWeatherLocationSearch(locationQuery)

  useEffect(() => {
    popoverAction.current?.updatePosition()
  }, [direction])

  useEffect(() => {
    setLocationInput(selectedLocation?.name ?? '')
  }, [selectedLocation])

  const openSettings = (event: MouseEvent<HTMLButtonElement>) => setSettingsAnchor(event.currentTarget)
  const closeSettings = () => setSettingsAnchor(null)

  const handleLogout = () => {
    clearStoredUser()
    closeSettings()
    navigate('/login')
  }

  const handleLocationInputChange = (_event: SyntheticEvent, value: string, reason: string) => {
    setLocationInput(value)
    setLocationQuery(reason === 'input' ? value : '')
  }

  const handleLocationChange = (_event: SyntheticEvent, location: LocationSearchResult | null) => {
    onLocationChange(location)
    if (location) setLocationInput(location.name)
    setLocationQuery('')
  }

  return (
    <Paper
      component="header"
      elevation={0}
      square
      sx={{
        alignItems: 'center',
        bgcolor: language === 'fa' && mode === 'light' ? 'background.default' : 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        boxShadow: '0 3px 8px rgba(24, 43, 64, 0.10)',
        display: 'flex',
        minHeight: 56,
        px: 3,
        py: 1.5,
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', gap: 1.25, minWidth: 0 }}>
        <Box
          alt=""
          component="img"
          src={logo}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '50%',
            boxShadow: '0 1px 4px rgba(27, 54, 76, 0.16)',
            flex: '0 0 auto',
            height: 56,
            objectFit: 'cover',
            width: 56,
          }}
        />
        <Typography
          noWrap
          sx={{
            color: language === 'fa' && mode === 'light' ? 'primary.dark' : 'primary.main',
            fontSize: 12,
            fontWeight: 400,
            lineHeight: '18px',
          }}
        >
          {t('dashboard.title')}
        </Typography>
      </Box>

      <Stack alignItems="center" direction="row" spacing={{ xs: 0.5, sm: 1.5 }} sx={{ marginInlineStart: 'auto' }}>
        <Autocomplete
          filterOptions={(options) => options}
          size='small'
          getOptionLabel={(location) => location.name}
          inputValue={locationInput}
          loading={isSearchingLocations}
          loadingText={t('dashboard.searchingLocations')}
          noOptionsText={
            locationSearchError ? (
              <Alert severity="error" sx={{ alignItems: 'center', fontSize: 12, py: 0.5 }}>
                {t('dashboard.locationSearchError')}
              </Alert>
            ) : isSearchingLocations ? (
              t('dashboard.searchingLocations')
            ) : (
              t('dashboard.noLocationsFound')
            )
          }
          onChange={handleLocationChange}
          onInputChange={handleLocationInputChange}
          options={locations}
          sx={{
            width: { xs: 154, sm: 295},
            '& .MuiOutlinedInput-root': {
              height: 40,
              minHeight: 40,
              py: 0,
            },
          }}
          value={selectedLocation}
          renderInput={(params) => (
            <TextField
              {...params}
              error={Boolean(locationSearchError)}
              label={t('dashboard.location')}
              slotProps={{

                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isSearchingLocations ? <CircularProgress size={16} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
          )}
        />
        <Tooltip title={t('dashboard.setting')}>
          <IconButton
            aria-controls={isSettingsOpen ? 'dashboard-settings' : undefined}
            aria-expanded={isSettingsOpen}
            aria-haspopup="true"
            aria-label={t('dashboard.setting')}
            onClick={openSettings}
            sx={{
              border: 1,
              borderColor: isSettingsOpen ? 'primary.main' : 'divider',
              borderRadius: 1,
              color: isSettingsOpen ? 'primary.main' : 'text.secondary',
              height: 40,
              width: 40,
            }}
          >
            <SettingsOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>

      <Popover
        anchorEl={settingsAnchor}
        anchorOrigin={{ horizontal: menuEdge, vertical: 'bottom' }}
        action={popoverAction}
        id="dashboard-settings"
        key={direction}
        onClose={closeSettings}
        open={isSettingsOpen}
        slotProps={{
          paper: {
            sx: { boxSizing: 'border-box', height: 'auto', mt: 1, px: 2,pb:1,pt:1.2, width: 220 },
          },
        }}
        transformOrigin={{ horizontal: menuEdge, vertical: 'top' }}
      >
        <Stack spacing={0}>
          <Box>
            <Typography component="h2" sx={{ fontSize: 16, lineHeight: '24px', mb: 1.5 }}>
              {t('dashboard.mode')}
            </Typography>
            <ButtonGroup fullWidth size="small" sx={{ '& .MuiButton-root': { minHeight: 33, px: 1, py: 0 } }} variant="outlined">
              <Button onClick={() => setMode('light')} variant={mode === 'light' ? 'contained' : 'outlined'}>
                <LightModeOutlinedIcon fontSize="small" sx={{ me: 0.75 }} /> {t('dashboard.lightMode')}
              </Button>
              <Button onClick={() => setMode('dark')} variant={mode === 'dark' ? 'contained' : 'outlined'}>
                <DarkModeOutlinedIcon fontSize="small" sx={{ me: 0.75 }} /> {t('dashboard.darkMode')}
              </Button>
            </ButtonGroup>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box>
            <Typography component="h2" sx={{ fontSize: 16, lineHeight: '24px', mb: 1.5 }}>
              {t('dashboard.language')}
            </Typography>
            <ButtonGroup fullWidth size="small" sx={{ '& .MuiButton-root': { minHeight: 33, px: 1, py: 0 } }} variant="outlined">
              <Button onClick={() => setLanguage('en')} variant={language === 'en' ? 'contained' : 'outlined'}>
                En
              </Button>
              <Button onClick={() => setLanguage('fa')} variant={language === 'fa' ? 'contained' : 'outlined'}>
                Fa
              </Button>
            </ButtonGroup>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<LogoutOutlinedIcon />}
            sx={{ justifyContent: 'flex-start', minHeight: 36 }}
          >
            {t('dashboard.exit')}
          </Button>
        </Stack>
      </Popover>
    </Paper>
  )
}
