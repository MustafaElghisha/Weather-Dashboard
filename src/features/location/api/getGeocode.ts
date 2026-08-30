import {
  GeocodeResponseSchema,
  type GeocodeResponseSchemaType,
} from "../schemas/geocodeSchema";

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getGeocode(
  location: string,
): Promise<GeocodeResponseSchemaType> {
  if (!location.trim()) return [];
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHER_API_KEY}`,
  );

  const data = await res.json();
  return GeocodeResponseSchema.parse(data);
}
