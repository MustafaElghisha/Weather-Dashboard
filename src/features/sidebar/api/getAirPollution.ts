import { AirPollutionResponseSchema } from "../schemas/pollutionSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getAirPollution({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const res = await fetch(
    `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${API_KEY}`,
  );

  const data = await res.json();

  return AirPollutionResponseSchema.parse(data);
}
