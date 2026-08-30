import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import clsx from "clsx";
import Information from "/src/assets/information.svg?react";
import {
  AIR_QUALITY_LEVELS,
  levelColors,
  type AirQualityLevel,
} from "../lib/airQuality";

type PollutionMeterCardProps = {
  label: string;
  tooltip: string;
  value: number;
  min: number;
  max: number;
  currentLevel: AirQualityLevel;
};

export function PollutionMeterCard({
  label,
  tooltip,
  value,
  min,
  max,
  currentLevel,
}: PollutionMeterCardProps) {
  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold uppercase">{label}</span>
            <Tooltip>
              <TooltipTrigger render={<Information className="size-3" />} />
              <TooltipContent>
                <p>{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <span className="text-lg font-semibold">{value}</span>
        </div>

        <Slider disabled min={min} max={max} value={value} />

        <div className="flex justify-between text-xs">
          <span className="text-gray-500">{min}</span>
          <span className="text-gray-500">{max}</span>
        </div>

        <ol className="flex justify-between">
          {AIR_QUALITY_LEVELS.map((level) => (
            <li
              key={level}
              className={clsx(
                "rounded-md border px-2 py-1 text-xs font-semibold",
                level === currentLevel
                  ? clsx(levelColors[level], "text-muted")
                  : "bg-muted text-muted-foreground",
              )}
            >
              {level}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
