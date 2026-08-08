import { getGeocode } from "@/api";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCoordinates } from "../CoordinatesProvider";

const capitalize = (str: string) =>
  str?.charAt(0).toUpperCase() + str?.slice(1) || "";

export default function CityPicker() {
  const [location, setLocation] = useState("Cairo");

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
      <ComboboxInput placeholder="Select a city" />
      <ComboboxContent>
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
