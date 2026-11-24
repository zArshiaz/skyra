import type { AxiosRequestConfig } from 'axios'

import { axiosClient } from '@/lib/http/axiosClient'
import type { WeatherLanguage } from '../models/weather.model'
import type { WeatherForecastDto, WeatherLocationSearchDto } from './weather.dto'
import { toLocationSearchResult, toWeatherForecast } from './weather.mapper'

const weatherApiBaseUrl = import.meta.env.VITE_WEATHER_API_BASE_URL ?? 'https://api.weatherapi.com/v1'
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

type RequestConfig = Pick<AxiosRequestConfig, 'signal'>

type GetForecastParams = RequestConfig & {
  days?: number
  language: WeatherLanguage
  location: string
}

type SearchLocationsParams = RequestConfig & {
  query: string
}

const getApiKey = () => {
  if (!weatherApiKey) throw new Error('VITE_WEATHER_API_KEY is not configured.')

  return weatherApiKey
}

export async function getWeatherForecast({ days = 14, language, location, signal }: GetForecastParams) {
  const { data } = await axiosClient.get<WeatherForecastDto>('/forecast.json', {
    baseURL: weatherApiBaseUrl,
    params: {
      alerts: 'no',
      aqi: 'no',
      days,
      key: getApiKey(),
      lang: language,
      q: location,
    },
    signal,
  })

  return toWeatherForecast(data)
}

export async function searchWeatherLocations({ query, signal }: SearchLocationsParams) {
  const { data } = await axiosClient.get<WeatherLocationSearchDto[]>('/search.json', {
    baseURL: weatherApiBaseUrl,
    params: { key: getApiKey(), q: query },
    signal,
  })

  return data.map(toLocationSearchResult)
}
