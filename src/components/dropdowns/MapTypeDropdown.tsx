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

type MapTypeDropdownProps = {
  mapType: MAP_TYPES_VALUES;
  setMapType: Dispatch<SetStateAction<MAP_TYPES_VALUES>>;
};

export default function MapTypeDropdown({
  mapType,
  setMapType,
}: MapTypeDropdownProps) {
  return (
    <Select
      value={capitalize(mapType)}
      onValueChange={(value) =>
        setMapType(value?.toLocaleLowerCase() as MAP_TYPES_VALUES)
      }
    >
      <SelectTrigger className="w-35">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {MAP_TYPES.map((type) => (
            <SelectItem
              key={type}
              value={capitalize(type)}
              className="capitalize"
            >
              {capitalize(type)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

const MAP_TYPES = [
  "clouds",
  "precipitation",
  "pressure",
  "wind",
  "temp",
] as const;

export type MAP_TYPES_VALUES = (typeof MAP_TYPES)[number];
