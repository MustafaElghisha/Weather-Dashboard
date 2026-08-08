import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useCoordinates } from "../../../app/CoordinatesProvider";
import MapLocation from "/src/assets/mapLocation.svg?react";
import { getGeocode } from "../api/getGeocode";

const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1) || "";

type CityPickerProps = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function CityPicker({ location, setLocation }: CityPickerProps) {
  const { setCoordinates } = useCoordinates();

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  useEffect(() => {
    if (geocodeData)
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

const cities = [
  // Africa
  "Cairo",
  "Lagos",
  "Nairobi",
  "Casablanca",
  "Johannesburg",
  "Accra",
  "Tunis",
  "Addis Ababa",
  "Dar es Salaam",
  "Khartoum",

  // Asia
  "Tokyo",
  "Beijing",
  "Shanghai",
  "Mumbai",
  "Delhi",
  "Bangkok",
  "Seoul",
  "Singapore",
  "Kuala Lumpur",
  "Jakarta",
  "Hong Kong",
  "Taipei",
  "Karachi",
  "Dhaka",
  "Riyadh",
  "Dubai",
  "Tehran",
  "Baghdad",
  "Islamabad",
  "Kathmandu",
  "Colombo",
  "Kabul",
  "Yangon",
  "Ho Chi Minh City",
  "Hanoi",
  "Manila",

  // Europe
  "London",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Amsterdam",
  "Vienna",
  "Brussels",
  "Prague",
  "Warsaw",
  "Budapest",
  "Bucharest",
  "Athens",
  "Lisbon",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Helsinki",
  "Zurich",
  "Geneva",
  "Barcelona",
  "Munich",
  "Milan",
  "Moscow",
  "Istanbul",
  "Kyiv",

  // North America
  "New York",
  "Los Angeles",
  "Chicago",
  "Toronto",
  "Mexico City",
  "Miami",
  "San Francisco",
  "Vancouver",
  "Montreal",
  "Houston",
  "Washington DC",
  "Boston",
  "Seattle",
  "Las Vegas",
  "Atlanta",
  "Dallas",
  "Phoenix",
  "Havana",
  "Panama City",
  "San Jose",

  // South America
  "São Paulo",
  "Buenos Aires",
  "Rio de Janeiro",
  "Bogotá",
  "Lima",
  "Santiago",
  "Caracas",
  "Montevideo",
  "Quito",
  "La Paz",

  // Oceania
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Auckland",
  "Perth",

  // Middle East
  "Beirut",
  "Amman",
  "Doha",
  "Abu Dhabi",
  "Kuwait City",
  "Muscat",
  "Tel Aviv",
];
