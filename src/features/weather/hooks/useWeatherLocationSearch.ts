import { useEffect, useState } from 'react'

import { searchWeatherLocations } from '../api/weather.api'
import type { LocationSearchResult } from '../models/weather.model'

type WeatherLocationSearchState = {
  error: Error | null
  isLoading: boolean
  locations: LocationSearchResult[]
}

const SEARCH_DELAY_MS = 300

export function useWeatherLocationSearch(query: string) {
  const [state, setState] = useState<WeatherLocationSearchState>({
    error: null,
    isLoading: false,
    locations: [],
  })

  useEffect(() => {
    const normalizedQuery = query.trim()
    if (normalizedQuery.length < 2) {
      setState({ error: null, isLoading: false, locations: [] })
      return undefined
    }

    const controller = new AbortController()
    const searchTimeout = window.setTimeout(() => {
      setState((current) => ({ ...current, error: null, isLoading: true }))

      searchWeatherLocations({ query: normalizedQuery, signal: controller.signal })
        .then((locations) => setState({ error: null, isLoading: false, locations }))
        .catch((error: unknown) => {
          if (controller.signal.aborted) return

          setState({
            error: error instanceof Error ? error : new Error('Could not search locations.'),
            isLoading: false,
            locations: [],
          })
        })
    }, SEARCH_DELAY_MS)

    return () => {
      controller.abort()
      window.clearTimeout(searchTimeout)
    }
  }, [query])

  return state
}
