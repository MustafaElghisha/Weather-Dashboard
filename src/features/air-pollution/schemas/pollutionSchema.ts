import { z } from "zod";

const CoordinatesSchema = z.object({ lat: z.number(), lon: z.number() });

const AqiSchema = z.object({
  aqi: z.number().int().min(1).max(5),
});

const ComponentsSchema = z.object({
  co: z.number().nonnegative(),
  no: z.number().nonnegative(),
  no2: z.number().nonnegative(),
  o3: z.number().nonnegative(),
  so2: z.number().nonnegative(),
  pm2_5: z.number().nonnegative(),
  pm10: z.number().nonnegative(),
  nh3: z.number().nonnegative(),
});

const AirPollutionEntrySchema = z.object({
  main: AqiSchema,
  components: ComponentsSchema,
  dt: z.number(),
});

export const AirPollutionResponseSchema = z.object({
  coord: CoordinatesSchema,
  list: z.array(AirPollutionEntrySchema),
});
