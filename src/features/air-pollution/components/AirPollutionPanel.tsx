import { useSuspenseQuery } from "@tanstack/react-query";
import {
  airQualityRanges,
  levelForAqi,
  levelForConcentration,
  pollutantNameMapping,
  scaleMax,
  type Pollutant,
} from "../lib/airQuality";
import { useCoordinates } from "@/app/CoordinatesProvider";
import { PollutionMeterCard } from "./PollutionMeterCard";
import { getAirPollution } from "../api/getAirPollution";

const AQI_TOOLTIP =
  "Air Quality Index. Possible values: 1, 2, 3, 4, 5. " +
  "Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.";

export function AirPollutionPanel() {
  const {
    coordinates: { lat, lng },
  } = useCoordinates();

  const { data } = useSuspenseQuery({
    queryKey: ["pollution", lat, lng],
    queryFn: () => getAirPollution({ lat, lng }),
  });
  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;

  return (
    <div className="flex flex-col gap-4">
      <PollutionMeterCard
        label="AQI"
        tooltip={AQI_TOOLTIP}
        value={aqi}
        min={1}
        max={5}
        currentLevel={levelForAqi(aqi)}
      />

      {Object.entries(components).map(([key, concentration]) => {
        const pollutant = key.toUpperCase() as Pollutant;
        const ranges = airQualityRanges[pollutant];

        return (
          <PollutionMeterCard
            key={key}
            label={key}
            tooltip={`Concentration of ${pollutantNameMapping[pollutant]}`}
            value={concentration}
            min={0}
            max={scaleMax(ranges, concentration)}
            currentLevel={levelForConcentration(ranges, concentration)}
          />
        );
      })}
    </div>
  );
}
