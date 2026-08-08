import Card from "./Card";
import useWeather from "@/hooks/useWeather";
import type { coords } from "../../types/map";

import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import Cloud from "/src/assets/cloud.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Wind from "/src/assets/wind.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
import UpArrow from "/src/assets/uparrow.svg?react";

type AdditionalInfo = {
  coords: coords;
};

export default function AdditionalInfo({
  coords: { lat, lng },
}: AdditionalInfo) {
  const weatherData = useWeather(lat, lng);

  return (
    <Card
      title="Additional Weather Info"
      className="2xl:h-full"
      childrenClassName="flex flex-col gap-8 2xl:grid 2xl:grid-cols-2 2xl:grid-rows-3 2xl:h-full"
    >
      {rows.map(({ label, value, Icon }) => (
        <div key={label} className="flex justify-between">
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            <Icon className="size-6" />
          </div>
          <span>
            <FormatComponent
              value={value}
              number={weatherData.current[value]}
            />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (value === "wind_deg")
    return (
      <UpArrow
        className="size-6"
        style={{ transform: `rotate(${number}deg)` }}
      />
    );

  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
