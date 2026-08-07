import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import WeatherIcon from "../WeatherIcon";
import type { coords } from "../../types/map";

type CurrentWeatherProps = { coords: coords };

export default function CurrentWeather({
  coords: { lat, lng },
}: CurrentWeatherProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => getWeather({ lat, lng }),
    refetchOnWindowFocus: false,
  });

  return (
    <Card
      title="Current Weather"
      className="sm:h-full sm:justify-stretch"
      childrenClassName="flex flex-col gap-6 sm:justify-between sm:h-full"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-center text-6xl font-semibold">
          {Math.round(data.current.temp)}°C
        </h2>
        <WeatherIcon src={data.current.weather[0].icon} className="size-14" />
        <h3 className="text-xl capitalize">
          {data.current.weather[0].description}
        </h3>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-xl">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: data.timezone,
          }).format(new Date(data.current.dt * 1000))}
        </h3>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels</p>
          <p>{Math.round(data.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humdity</p>
          <p>{Math.round(data.current.humidity)}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{Math.round(data.current.wind_speed)} kph</p>
        </div>
      </div>
    </Card>
  );
}
