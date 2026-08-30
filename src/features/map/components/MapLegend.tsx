import { MAP_TYPES_DATA } from "../lib/mapTypes";

type MapLegendProps = {
  mapType: keyof typeof MAP_TYPES_DATA;
};

export default function MapLegend({ mapType }: MapLegendProps) {
  const data = MAP_TYPES_DATA[mapType];

  const minValue = Math.min(...data.stops.map((stop) => stop.value));
  const maxValue = Math.max(...data.stops.map((stop) => stop.value));

  const gradientStops = data.stops
    .map(
      (stop) =>
        `${stop.color} ${
          ((stop.value - minValue) / (maxValue - minValue)) * 100
        }%`,
    )
    .join(",");

  return (
    <div className="bg-sidebar/70 absolute top-4 right-4 flex w-[min(50%,400px)] flex-col gap-3 rounded-xl border p-4 shadow-lg">
      <p className="text-foreground text-sm font-semibold">{data.label}</p>

      <div
        className="outline-accent h-6 w-full rounded-xl border dark:border-none"
        style={{ background: `linear-gradient(to right, ${gradientStops})` }}
      />

      <div className="text-foreground flex justify-between text-xs">
        <span>
          {minValue}
          {data.unit}
        </span>
        <span>
          {maxValue}
          {data.unit}
        </span>
      </div>
    </div>
  );
}
