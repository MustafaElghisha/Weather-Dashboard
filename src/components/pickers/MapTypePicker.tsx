import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Dispatch, SetStateAction } from "react";
import Layer from "/src/assets/layer.svg?react";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const MAP_TYPES = [
  "clouds",
  "precipitation",
  "pressure",
  "wind",
  "temp",
] as const;

export type MapType = (typeof MAP_TYPES)[number];

type MapTypePickerProps = {
  mapType: MapType;
  setMapType: Dispatch<SetStateAction<MapType>>;
};

export default function MapTypePicker({
  mapType,
  setMapType,
}: MapTypePickerProps) {
  return (
    <Select
      value={capitalize(mapType)}
      onValueChange={(value) =>
        setMapType(value?.toLocaleLowerCase() as MapType)
      }
    >
      <SelectTrigger className="w-37 border-2 xl:w-43">
        <Layer />
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
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
