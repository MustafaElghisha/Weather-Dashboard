import clsx from "clsx";

type WeatherIconProps = {
  src: string;
  className?: string;
};

export default function WeatherIcon({ src, className }: WeatherIconProps) {
  const isDev = import.meta.env.DEV;

  return (
    <img
      className={clsx("size-8", className)}
      src={
        isDev
          ? `https://openweathermap.org/img/wn/${src}@4x.png`
          : `/api/weather-icon?icon=${src}`
      }
      alt="Weather Icon"
    />
  );
}
