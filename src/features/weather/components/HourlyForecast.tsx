import Card from "../../../components/ui/Card";
import useWeather from "@/features/weather/hooks/useWeather";
import WeatherIcon from "../../../components/ui/WeatherIcon";
import { useCoordinates } from "../../../app/CoordinatesProvider";

export default function HourlyForecast() {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();
  const weatherData = useWeather(lat, lng);

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      className="2xl:h-full"
      childrenClassName="flex gap-6 overflow-scroll 2xl:h-full scrollbar-none"
    >
      {weatherData.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col items-center gap-2 p-2">
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
              timeZone: "UTC",
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
