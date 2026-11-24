import type { LocationSearchResult } from './models/weather.model'

const STORAGE_KEY = 'skyra-weather-location'

const isLocationSearchResult = (value: unknown): value is LocationSearchResult => {
  if (typeof value !== 'object' || value === null) return false

  const location = value as Record<string, unknown>
  const coordinates = location.coordinates

  return (
    typeof location.id === 'number' &&
    typeof location.name === 'string' &&
    typeof location.region === 'string' &&
    typeof location.country === 'string' &&
    typeof coordinates === 'object' &&
    coordinates !== null &&
    typeof (coordinates as Record<string, unknown>).latitude === 'number' &&
    typeof (coordinates as Record<string, unknown>).longitude === 'number'
  )
}

export function getStoredWeatherLocation(): LocationSearchResult | null {
  const storedLocation = localStorage.getItem(STORAGE_KEY)
  if (!storedLocation) return null

  try {
    const location: unknown = JSON.parse(storedLocation)
    return isLocationSearchResult(location) ? location : null
  } catch {
    return null
  }
}

export function saveWeatherLocation(location: LocationSearchResult) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(location))
}

export function clearStoredWeatherLocation() {
  localStorage.removeItem(STORAGE_KEY)
}
