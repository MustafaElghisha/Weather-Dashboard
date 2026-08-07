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
  sunrise: z.number(),
  sunset: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number(),
  weather: z.array(WeatherConditionSchema),
});

// Hourly forecast entry
const HourlyWeatherSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number(),
  weather: z.array(WeatherConditionSchema),
  pop: z.number(),
});

// Daily temperature breakdown
const DailyTempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

// Daily feels-like breakdown
const DailyFeelsLikeSchema = z.object({
  day: z.number(),
  night: z.number(),
  eve: z.number(),
  morn: z.number(),
});

// Daily forecast entry
const DailyWeatherSchema = z.object({
  dt: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  summary: z.string(),
  temp: DailyTempSchema,
  feels_like: DailyFeelsLikeSchema,
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherConditionSchema),
  clouds: z.number(),
  pop: z.number(),
  rain: z.number().optional(),
  uvi: z.number(),
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
