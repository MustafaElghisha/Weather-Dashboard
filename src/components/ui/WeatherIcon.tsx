import clsx from "clsx";

type WeatherIconProps = {
  src: string;
  className?: string;
};

export default function WeatherIcon({ src, className }: WeatherIconProps) {
  return (
    <img
      className={clsx("size-8", className)}
      src={`/api/weather-icon?icon=${src}`}
      alt="Weather Icon"
    />
  );
}
