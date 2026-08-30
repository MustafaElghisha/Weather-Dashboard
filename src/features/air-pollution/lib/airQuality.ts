export const AIR_QUALITY_LEVELS = [
  "Good",
  "Fair",
  "Moderate",
  "Poor",
  "Very Poor",
] as const;

export type AirQualityLevel = (typeof AIR_QUALITY_LEVELS)[number];

export interface Range {
  min: number;
  max: number | null;
}

export type Pollutant =
  "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3";

export const airQualityRanges = {
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

export const pollutantNameMapping = {
  SO2: "Sulfur dioxide",
  NO2: "Nitrogen dioxide",
  PM10: "Particulate matter 10",
  PM2_5: "Fine particles matter",
  O3: "Ozone",
  CO: "Carbon monoxide",
  NO: "Nitrogen monoxide",
  NH3: "Ammonia",
};

export const levelColors = {
  Good: "bg-green-500 border-green-500",
  Fair: "bg-amber-400 border-amber-400",
  Moderate: "bg-orange-500 border-orange-500",
  Poor: "bg-red-500 border-red-500",
  "Very Poor": "bg-purple-600 border-purple-600",
};

export function scaleMax(
  ranges: Record<AirQualityLevel, Range>,
  value: number,
) {
  return Math.max(ranges["Very Poor"].min, value);
}

export function levelForAqi(aqi: number): AirQualityLevel {
  return AIR_QUALITY_LEVELS[aqi - 1];
}

export function levelForConcentration(
  ranges: Record<AirQualityLevel, Range>,
  value: number,
): AirQualityLevel {
  return AIR_QUALITY_LEVELS.find((level) => {
    const { min, max } = ranges[level];
    return value >= min && (max === null || value <= max);
  }) as AirQualityLevel;
}
