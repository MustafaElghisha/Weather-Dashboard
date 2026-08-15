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
  dew_point: z.number().optional(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number().optional(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherConditionSchema),
});

// Hourly forecast entry
const HourlyWeatherSchema = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number().optional(),
  pressure: z.number().optional(),
  humidity: z.number().optional(),
  dew_point: z.number().optional(),
  uvi: z.number().optional(),
  clouds: z.number().optional(),
  visibility: z.number().optional(),
  wind_speed: z.number().optional(),
  wind_deg: z.number().optional(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherConditionSchema),
  pop: z.number().optional(),
});

// Daily temperature breakdown
const DailyTempSchema = z.object({
  day: z.number(),
  min: z.number(),
  max: z.number(),
  night: z.number().optional(),
  eve: z.number().optional(),
  morn: z.number().optional(),
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
  sunrise: z.number().optional(),
  sunset: z.number().optional(),
  moonrise: z.number().optional(),
  moonset: z.number().optional(),
  moon_phase: z.number().optional(),
  summary: z.string().optional(),
  temp: DailyTempSchema,
  feels_like: DailyFeelsLikeSchema,
  pressure: z.number().optional(),
  humidity: z.number().optional(),
  dew_point: z.number().optional(),
  wind_speed: z.number().optional(),
  wind_deg: z.number().optional(),
  wind_gust: z.number().optional(),
  weather: z.array(WeatherConditionSchema),
  clouds: z.number().optional(),
  pop: z.number().optional(),
  rain: z.number().optional(),
  uvi: z.number().optional(),
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
