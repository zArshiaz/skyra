import type {
  WeatherConditionDto,
  WeatherForecastDto,
  WeatherLocationSearchDto,
} from './weather.dto'
import type {
  LocationSearchResult,
  WeatherCondition,
  WeatherForecast,
} from '../models/weather.model'

const toCondition = (dto: WeatherConditionDto): WeatherCondition => ({
  code: dto.code,
  iconUrl: `https:${dto.icon}`,
  text: dto.text,
})

export const toWeatherForecast = (dto: WeatherForecastDto): WeatherForecast => ({
  current: {
    condition: toCondition(dto.current.condition),
    feelsLikeCelsius: dto.current.feelslike_c,
    isDay: dto.current.is_day === 1,
    observedAt: dto.current.last_updated,
    temperatureCelsius: dto.current.temp_c,
  },
  daily: dto.forecast.forecastday.map((forecast) => ({
    averageHumidity: forecast.day.avghumidity,
    averageTemperatureCelsius: forecast.day.avgtemp_c,
    condition: toCondition(forecast.day.condition),
    date: forecast.date,
    precipitationProbability: forecast.day.daily_chance_of_rain,
    temperatureMaxCelsius: forecast.day.maxtemp_c,
    temperatureMinCelsius: forecast.day.mintemp_c,
  })),
  location: {
    country: dto.location.country,
    coordinates: { latitude: dto.location.lat, longitude: dto.location.lon },
    localTime: dto.location.localtime,
    name: dto.location.name,
    region: dto.location.region,
    timeZone: dto.location.tz_id,
  },
})

export const toLocationSearchResult = (dto: WeatherLocationSearchDto): LocationSearchResult => ({
  country: dto.country,
  coordinates: { latitude: dto.lat, longitude: dto.lon },
  id: dto.id,
  name: dto.name,
  region: dto.region,
})
