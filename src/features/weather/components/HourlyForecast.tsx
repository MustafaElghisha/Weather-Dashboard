import useWeather from "@/features/weather/hooks/useWeather";
import WeatherIcon from "@/features/weather/components/WeatherIcon";
import { useCoordinates } from "@/app/CoordinatesProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function HourlyForecast() {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();
  const weatherData = useWeather(lat, lng);

  return (
    <Card className="2xl:h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Hourly Forecast (48 Hours)
        </CardTitle>
      </CardHeader>
      <CardContent className="2xl:h-full">
        <ScrollArea>
          <div className="flex gap-6 pb-4">
            {weatherData.hourly.map((hour) => (
              <div
                key={hour.dt}
                className="flex flex-col items-center gap-2 p-2"
              >
                <p className="whitespace-nowrap">
                  {new Date(hour.dt * 1000).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                    timeZone: weatherData.timezone,
                  })}
                </p>
                <WeatherIcon src={hour.weather[0].icon} />
                <p>{Math.round(hour.temp)}°C</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
