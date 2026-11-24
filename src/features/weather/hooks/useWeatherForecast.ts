import { useEffect, useState } from 'react'

import { getWeatherForecast } from '../api/weather.api'
import type { WeatherForecast, WeatherLanguage } from '../models/weather.model'

type WeatherForecastState = {
  error: Error | null
  forecast: WeatherForecast | null
  isLoading: boolean
}

export function useWeatherForecast(location: string | null, language: WeatherLanguage) {
  const [state, setState] = useState<WeatherForecastState>({
    error: null,
    forecast: null,
    isLoading: true,
  })

  useEffect(() => {
    if (!location) {
      setState({ error: null, forecast: null, isLoading: false })
      return undefined
    }

    const controller = new AbortController()

    setState((current) => ({ ...current, error: null, isLoading: true }))

    getWeatherForecast({ language, location, signal: controller.signal })
      .then((forecast) => setState({ error: null, forecast, isLoading: false }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return

        setState({
          error: error instanceof Error ? error : new Error('Could not load weather data.'),
          forecast: null,
          isLoading: false,
        })
      })

    return () => controller.abort()
  }, [language, location])

  return state
}
