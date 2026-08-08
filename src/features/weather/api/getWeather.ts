import { WeatherResponseSchema } from "../schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lng }: { lat: number; lng: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`,
  );
  const data = await res.json();
  return WeatherResponseSchema.parse(data);
}
