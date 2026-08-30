import useWeather from "@/features/weather/hooks/useWeather";
import { useCoordinates } from "@/app/CoordinatesProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rows } from "../constants/data";
import FormatWeatherValue from "../utils/formatWeatherValue";

export default function AdditionalInfo() {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();
  const weatherData = useWeather(lat, lng);

  return (
    <Card className="2xl:h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Additional Weather Info
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 2xl:grid 2xl:h-full 2xl:grid-cols-2 2xl:grid-rows-3">
        {rows.map(({ label, value, Icon }) => (
          <div key={label} className="flex justify-between">
            <div className="flex gap-4">
              <span className="text-gray-500">{label}</span>
              <Icon className="size-6" />
            </div>
            <span>
              <FormatWeatherValue
                value={value}
                number={weatherData.current[value]}
                timeZone={weatherData.timezone}
              />
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
