import { getWeather } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useWeather(lat: number, lng: number) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => getWeather({ lat, lng }),
    refetchOnWindowFocus: false,
  });
  return data;
}
