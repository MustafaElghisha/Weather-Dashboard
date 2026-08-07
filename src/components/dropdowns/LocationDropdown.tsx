import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

type LocationDropdownProps = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function LocationDropdown({
  location,
  setLocation,
}: LocationDropdownProps) {
  return (
    <Select
      value={capitalize(location)}
      onValueChange={(value) => setLocation(value!)}
    >
      <SelectTrigger className="w-35">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const cities = [
  "Tokyo",
  "New York",
  "London",
  "Paris",
  "Dubai",
  "Barcelona",
  "Berlin",
  "Cairo",
  "Mexico City",
  "Seoul",
];
