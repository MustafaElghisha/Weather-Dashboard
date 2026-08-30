import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useCoordinates } from "../../../app/CoordinatesProvider";
import MapLocation from "/src/assets/mapLocation.svg?react";
import { getGeocode } from "../api/getGeocode";
import { cities } from "../data/cities";

const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1) || "";

type CityPickerProps = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function CityPicker({ location, setLocation }: CityPickerProps) {
  const { setCoordinates } = useCoordinates();

  const { data: geocodeData } = useSuspenseQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  useEffect(() => {
    if (geocodeData.length)
      setCoordinates({ lat: geocodeData[0].lat, lng: geocodeData[0].lon });
  }, [geocodeData, setCoordinates]);

  return (
    <Combobox
      autoHighlight
      items={cities}
      value={capitalize(location)}
      onValueChange={(value) => value && setLocation(value)}
    >
      <div className="relative flex w-37 items-center xl:w-43">
        <MapLocation className="absolute left-3 size-4" />
        <ComboboxInput
          placeholder="Select a city"
          className="border-2 pl-6"
          showClear
        />
      </div>
      <ComboboxContent className="w-37 xl:w-43">
        <ComboboxEmpty>No cities found.</ComboboxEmpty>
        <ComboboxList>
          {(city) => (
            <ComboboxItem key={city} value={city}>
              {city}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
