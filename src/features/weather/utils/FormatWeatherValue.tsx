import UpArrow from "/src/assets/uparrow.svg?react";

export default function FormatWeatherValue({
  value,
  number,
  timeZone,
}: {
  value: string;
  number: number;
  timeZone: string;
}) {
  if (value === "sunrise" || value === "sunset")
    return new Date(number * 1000).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timeZone,
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
