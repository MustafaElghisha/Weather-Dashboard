import useWeather from "@/features/weather/hooks/useWeather";
import WeatherIcon from "../../../components/ui/WeatherIcon";
import { useCoordinates } from "../../../app/CoordinatesProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CurrentWeather() {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();
  const weatherData = useWeather(lat, lng);

  return (
    <Card className="sm:h-full sm:justify-stretch">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:h-full sm:justify-between">
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
            {new Date(weatherData.current.dt * 1000).toLocaleTimeString(
              "en-US",
              {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: weatherData.timezone,
              },
            )}
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
      </CardContent>
    </Card>
  );
}
