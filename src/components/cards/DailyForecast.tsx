import Card from "./Card";
import useWeather from "@/hooks/useWeather";
import type { coords } from "../../types/map";

import WeatherIcon from "../WeatherIcon";

type DailyForecastProps = { coords: coords };

export default function DailyForecast({
  coords: { lat, lng },
}: DailyForecastProps) {
  const weatherData = useWeather(lat, lng);

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {weatherData.daily.map((day) => (
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
