import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../api/getWeather";

export default function useWeather(lat: number, lng: number) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", lat, lng],
    queryFn: () => getWeather({ lat, lng }),
    refetchOnWindowFocus: false,
  });
  return data;
}
