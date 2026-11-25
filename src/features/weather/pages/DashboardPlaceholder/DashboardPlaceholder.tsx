import { useState } from 'react'

import { Alert, Box, Container } from '@mui/material'

import { useI18n } from '@/i18n/useI18n'
import { LoadingState } from '@/shared/components/LoadingState/LoadingState'
import { DashboardHeader } from '../../components/DashboardHeader/DashboardHeader'
import { DailyForecast } from '../../components/DailyForecast/DailyForecast'
import { MonthlyTemperatureChart } from '../../components/MonthlyTemperatureChart/MonthlyTemperatureChart'
import { TodayWeatherCard } from '../../components/TodayWeatherCard/TodayWeatherCard'
import { mockMonthlyTemperatures } from '../../data/monthlyTemperature.mock'
import { useWeatherForecast } from '../../hooks/useWeatherForecast'
import type { LocationSearchResult } from '../../models/weather.model'
import {
  clearStoredWeatherLocation,
  getStoredWeatherLocation,
  saveWeatherLocation,
} from '../../weather.storage'

export function DashboardPlaceholder() {
  const { language, t } = useI18n()
  const [selectedLocation, setSelectedLocation] = useState<LocationSearchResult | null>(getStoredWeatherLocation)
  const weatherLocation = selectedLocation
    ? `${selectedLocation.coordinates.latitude},${selectedLocation.coordinates.longitude}`
    : null
  const { error, forecast, isLoading } = useWeatherForecast(weatherLocation, language)

  const handleLocationChange = (location: LocationSearchResult | null) => {
    setSelectedLocation(location)

    if (location) saveWeatherLocation(location)
    else clearStoredWeatherLocation()
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <DashboardHeader onLocationChange={handleLocationChange} selectedLocation={selectedLocation} />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 80px)', py: 3 }}>
        <Container maxWidth="xl">
          {!selectedLocation ? <Alert severity="info">{t('dashboard.locationRequired')}</Alert> : null}
          {selectedLocation && isLoading && !forecast ? <LoadingState label={t('dashboard.loadingWeather')} /> : null}
          {selectedLocation && error ? <Alert severity="error">{t('dashboard.weatherError')}</Alert> : null}
          {selectedLocation && forecast ? (
            <Box
              sx={{
                display: 'grid',
                columnGap: { xs: 3, lg: 5 },
                rowGap: '28px',
                gridTemplateColumns: {
                  xs: 'minmax(0, 1fr)',
                  md: 'minmax(0, 607fr) minmax(0, 744fr)',
                },
                alignItems: 'stretch',
              }}
            >
              <TodayWeatherCard weather={forecast} />
              <MonthlyTemperatureChart data={mockMonthlyTemperatures} />
              <Box sx={{ gridColumn: '1 / -1', minWidth: 0 }}>
                <DailyForecast days={forecast.daily} today={forecast.location.localTime.slice(0, 10)} />
              </Box>
            </Box>
          ) : null}
        </Container>
      </Box>
    </Box>
  )
}
