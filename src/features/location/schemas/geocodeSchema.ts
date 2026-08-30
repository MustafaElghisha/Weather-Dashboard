import { z } from "zod";

const GeocodeSchema = z.object({
  name: z.string(),
  local_names: z.record(z.string(), z.string()),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
});

// The API returns an array of Geocodes
export const GeocodeResponseSchema = z.array(GeocodeSchema);

export type GeocodeResponseSchemaType = z.infer<typeof GeocodeResponseSchema>;
