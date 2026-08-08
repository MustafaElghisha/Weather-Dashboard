import Card from "./Card";
import useWeather from "@/hooks/useWeather";
import type { coords } from "../../types/map";

import WeatherIcon from "../WeatherIcon";

type CurrentWeatherProps = { coords: coords };

export default function CurrentWeather({
  coords: { lat, lng },
}: CurrentWeatherProps) {
  const weatherData = useWeather(lat, lng);

  return (
    <Card
      title="Current Weather"
      className="sm:h-full sm:justify-stretch"
      childrenClassName="flex flex-col gap-6 sm:justify-between sm:h-full"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-6xl font-semibold">
          {Math.round(weatherData.current.temp)}°C
        </h2>
        <WeatherIcon
          src={weatherData.current.weather[0].icon}
          className="size-14"
        />
        <h3 className="text-xl capitalize">
          {weatherData.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: weatherData.timezone,
          }).format(new Date(weatherData.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels</p>
          <p>{Math.round(weatherData.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humdity</p>
          <p>{Math.round(weatherData.current.humidity)}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{Math.round(weatherData.current.wind_speed)} kph</p>
        </div>
      </div>
    </Card>
  );
}
