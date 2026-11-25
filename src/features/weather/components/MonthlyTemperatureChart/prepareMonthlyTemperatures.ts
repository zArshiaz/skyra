import type { MonthlyTemperature } from '../../models/weather.model'

export function prepareMonthlyTemperatures(data: readonly MonthlyTemperature[]) {
  const temperatures = Array<number | null>(12).fill(null)
  for (const { month, averageCelsius } of data) {
    if (Number.isInteger(month) && month >= 1 && month <= 12 && Number.isFinite(averageCelsius)) {
      temperatures[month - 1] = averageCelsius
    }
  }

  const values = temperatures.filter(value => value !== null)
  return {
    temperatures,
    min: Math.floor(Math.min(10, ...values) / 10) * 10,
    max: Math.ceil(Math.max(40, ...values) / 10) * 10,
  }
}
