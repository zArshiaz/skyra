export type WeatherConditionDto = {
  code: number
  icon: string
  text: string
}

export type WeatherLocationDto = {
  country: string
  lat: number
  localtime: string
  lon: number
  name: string
  region: string
  tz_id: string
}

export type WeatherCurrentDto = {
  condition: WeatherConditionDto
  feelslike_c: number
  is_day: 0 | 1
  last_updated: string
  temp_c: number
}

export type WeatherForecastDayDto = {
  avghumidity: number
  condition: WeatherConditionDto
  daily_chance_of_rain: number
  maxtemp_c: number
  mintemp_c: number
}

export type WeatherForecastDayEntryDto = {
  date: string
  day: WeatherForecastDayDto
}

export type WeatherForecastDto = {
  current: WeatherCurrentDto
  forecast: {
    forecastday: WeatherForecastDayEntryDto[]
  }
  location: WeatherLocationDto
}

export type WeatherLocationSearchDto = {
  country: string
  id: number
  lat: number
  lon: number
  name: string
  region: string
  url: string
}
