import { GeocodeResponseSchema } from "../schemas/geocodeSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getGeocode(location: string) {
  if (location === "") return "";
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
  );

  const data = await res.json();
  return GeocodeResponseSchema.parse(data);
}
