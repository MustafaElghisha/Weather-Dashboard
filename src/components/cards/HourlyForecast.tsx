import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { coords } from "../../types/map";

type HourlyForecastProps = { coords: coords };

export default function HourlyForecast({
  coords: { lat, lng },
}: HourlyForecastProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => getWeather({ lat: 26.82, lng: 30.8 }),
    refetchOnWindowFocus: false,
  });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      className="2xl:h-full"
      childrenClassName="flex gap-6 overflow-scroll 2xl:h-full"
    >
      {data.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col items-center gap-2 p-2">
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
