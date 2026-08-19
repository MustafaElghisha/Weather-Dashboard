import { z } from "zod";

// Reusable weather condition object
const WeatherConditionSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

// Current weather
const CurrentWeatherSchema = z.object({
  dt: z.number(),
  sunrise: z.number().default(0),
  sunset: z.number().default(0),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  weather: z.array(WeatherConditionSchema),
});

// Hourly forecast entry
const HourlyWeatherSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  weather: z.array(WeatherConditionSchema),
});

// Daily temperature breakdown
const DailyTempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
});

// Daily forecast entry
const DailyWeatherSchema = z.object({
  dt: z.number(),
  temp: DailyTempSchema,
  weather: z.array(WeatherConditionSchema),
});

// Root schema
export const WeatherResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: CurrentWeatherSchema,
  hourly: z.array(HourlyWeatherSchema),
  daily: z.array(DailyWeatherSchema),
});
