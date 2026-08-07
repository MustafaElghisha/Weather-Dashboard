import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { coords } from "../../types/map";

type DailyForecastProps = { coords: coords };

export default function DailyForecast({
  coords: { lat, lng },
}: DailyForecastProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => getWeather({ lat, lng }),
    refetchOnWindowFocus: false,
  });

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data.daily.map((day) => (
        <div key={day.dt} className="flex items-center justify-between">
          <p className="flex-1">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p className="flex-1 text-end">{Math.round(day.temp.day)}°C</p>
          <p className="flex-1 text-end text-gray-500/75">
            {Math.round(day.temp.min)}°C
          </p>
          <p className="flex-1 text-end text-gray-500/75">
            {Math.round(day.temp.max)}°C
          </p>
        </div>
      ))}
    </Card>
  );
}
