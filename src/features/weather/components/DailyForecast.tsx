import Card from "../../../components/ui/Card";
import useWeather from "@/features/weather/hooks/useWeather";
import WeatherIcon from "../../../components/ui/WeatherIcon";
import { useCoordinates } from "../../../app/CoordinatesProvider";

export default function DailyForecast() {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();
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
