export type WeatherLanguage = 'en' | 'fa'

export type MonthlyTemperature = { month: number; averageCelsius: number }

export type WeatherCondition = {
  code: number
  iconUrl: string
  text: string
}

export type WeatherLocation = {
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
  localTime: string
  name: string
  region: string
  timeZone: string
}

export type CurrentWeather = {
  condition: WeatherCondition
  feelsLikeCelsius: number
  isDay: boolean
  observedAt: string
  temperatureCelsius: number
}

export type DailyWeatherForecast = {
  averageHumidity: number
  averageTemperatureCelsius: number
  condition: WeatherCondition
  date: string
  precipitationProbability: number
  temperatureMaxCelsius: number
  temperatureMinCelsius: number
}

export type WeatherForecast = {
  current: CurrentWeather
  daily: DailyWeatherForecast[]
  location: WeatherLocation
}

export type LocationSearchResult = {
  country: string
  coordinates: {
    latitude: number
    longitude: number
  }
  id: number
  name: string
  region: string
}
