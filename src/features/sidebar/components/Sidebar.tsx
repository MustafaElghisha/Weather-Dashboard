import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, type Dispatch, type SetStateAction } from "react";
import Card from "../../../components/Card";
import { Slider } from "../../../components/ui/slider";
import clsx from "clsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Information from "/src/assets/information.svg?react";
import Chevron from "/src/assets/ChevronLeft.svg?react";
import SidebarSkeleton from "./SidebarSkeleton";
import { useCoordinates } from "../../../app/CoordinatesProvider";
import { getAirPollution } from "../api/getAirPollution";

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();

  return (
    <aside
      className={clsx(
        "bg-sidebar border-sidebar-border fixed top-0 right-0 h-dvh w-(--sidebar-width) scrollbar-none overflow-y-scroll border px-3 py-6 shadow-md transition-transform duration-500 lg:translate-x-0!",
        isSidebarOpen ? "translate-x-0" : "translate-x-full",
      )}
    >
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold">Air Pollution</h2>
        <button onClick={() => setIsSidebarOpen(false)}>
          <Chevron className="size-6 rotate-180 cursor-pointer lg:hidden" />
        </button>
      </div>
      <Suspense fallback={<SidebarSkeleton />}>
        <AirPollution lat={lat} lng={lng} />
      </Suspense>
    </aside>
  );
}

function AirPollution({ lat, lng }: { lat: number; lng: number }) {
  const { data } = useSuspenseQuery({
    queryKey: ["polution", lat, lng],
    queryFn: () => getAirPollution({ lat: lat, lng: lng }),
  });

  return (
    <div className="flex flex-col gap-4">
      <Card
        className="from-secondary to-secondary/60 transition-transform duration-300 hover:scale-105"
        childrenClassName="flex flex-col gap-3"
      >
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <span className="text-lg font-bold uppercase">AQI</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={<Information className="size-3" />} />
                <TooltipContent>
                  <p>
                    Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 =
                    Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <span className="text-lg font-semibold">{data.list[0].main.aqi}</span>
        </div>
        <Slider disabled min={1} max={5} value={data.list[0].main.aqi} />
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">1</span>
          <span className="text-gray-500">5</span>
        </div>
        <ol className="flex justify-between">
          {AIR_QUALITY_LEVELS.map((quality, index) => {
            const currentLevel = (() => {
              switch (data.list[0].main.aqi) {
                case 1:
                  return "Good";
                case 2:
                  return "Fair";
                case 3:
                  return "Moderate";
                case 4:
                  return "Poor";
                default:
                  return "Very Poor";
              }
            })();

            return (
              <li
                key={quality}
                className={clsx(
                  "rounded-md border px-2 py-1 text-xs font-semibold",
                  index + 1 === data.list[0].main.aqi
                    ? clsx(
                        getQualityColor(currentLevel as AirQualityLevel),
                        "text-muted",
                      )
                    : "bg-muted text-muted-foreground",
                )}
              >
                {quality}
              </li>
            );
          })}
        </ol>
      </Card>

      {Object.entries(data.list[0].components).map(([key, value]) => {
        const pollutant =
          airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges];

        const max = Math.max(pollutant["Very Poor"].min, value);

        const currentLevel = (() => {
          for (const [level, range] of Object.entries(pollutant)) {
            if (range.max && value <= range.max && value >= range.min) {
              return level;
            }
          }
          return "Very Poor";
        })();

        return (
          <Card
            key={key}
            className="from-secondary to-secondary/60 transition-transform duration-300 hover:scale-105"
            childrenClassName="flex flex-col gap-3"
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold uppercase">{key}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger
                      render={<Information className="size-3" />}
                    />
                    <TooltipContent>
                      <p>
                        Сoncentration of&nbsp;
                        {pollutantNameMapping[key.toUpperCase() as Pollutant]}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <span className="text-lg font-semibold">{value}</span>
            </div>
            <Slider disabled min={0} max={max} value={value} />
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">0</span>
              <span className="text-gray-500">{max}</span>
            </div>
            <ol className="flex justify-between">
              {Object.keys(pollutant).map((quality) => (
                <li
                  key={quality}
                  className={clsx(
                    "rounded-md border px-2 py-1 text-xs font-semibold",
                    quality === currentLevel
                      ? clsx(
                          getQualityColor(currentLevel as AirQualityLevel),
                          "text-muted",
                        )
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {quality}
                </li>
              ))}
            </ol>
          </Card>
        );
      })}
    </div>
  );
}

const AIR_QUALITY_LEVELS = [
  "Good",
  "Fair",
  "Moderate",
  "Poor",
  "Very Poor",
] as const;

type AirQualityLevel = (typeof AIR_QUALITY_LEVELS)[number];

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  SO2: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 80 },
    Moderate: { min: 80, max: 250 },
    Poor: { min: 250, max: 350 },
    "Very Poor": { min: 350, max: null },
  },
  NO2: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM10: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 50 },
    Moderate: { min: 50, max: 100 },
    Poor: { min: 100, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
  PM2_5: {
    Good: { min: 0, max: 10 },
    Fair: { min: 10, max: 25 },
    Moderate: { min: 25, max: 50 },
    Poor: { min: 50, max: 75 },
    "Very Poor": { min: 75, max: null },
  },
  O3: {
    Good: { min: 0, max: 60 },
    Fair: { min: 60, max: 100 },
    Moderate: { min: 100, max: 140 },
    Poor: { min: 140, max: 180 },
    "Very Poor": { min: 180, max: null },
  },
  CO: {
    Good: { min: 0, max: 4400 },
    Fair: { min: 4400, max: 9400 },
    Moderate: { min: 9400, max: 12400 },
    Poor: { min: 12400, max: 15400 },
    "Very Poor": { min: 15400, max: null },
  },
  NO: {
    Good: { min: 0, max: 20 },
    Fair: { min: 20, max: 40 },
    Moderate: { min: 40, max: 60 },
    Poor: { min: 60, max: 80 },
    "Very Poor": { min: 80, max: null },
  },
  NH3: {
    Good: { min: 0, max: 40 },
    Fair: { min: 40, max: 70 },
    Moderate: { min: 70, max: 150 },
    Poor: { min: 150, max: 200 },
    "Very Poor": { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};

const getQualityColor = (currentLevel: AirQualityLevel) => {
  switch (currentLevel) {
    case "Good":
      return `bg-green-500 border-green-500`;
    case "Fair":
      return `bg-amber-400 border-amber-400`;
    case "Moderate":
      return `bg-orange-500 border-orange-500`;
    case "Poor":
      return `bg-red-500 border-red-500`;
    case "Very Poor":
      return `bg-purple-600 border-purple-600`;
    default:
      return "bg-zinc-600 border-zinc-600";
  }
};
