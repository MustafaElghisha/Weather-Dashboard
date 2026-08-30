import CityPicker from "@/features/location/components/CityPicker";
import MapTypePicker from "@/features/map/components/MapTypePicker";
import ThemeSwitcher from "@/features/theme/components/ThemeSwitcher";
import WeatherStorm from "/src/assets/weatherStorm.svg?react";
import { Hamburger } from "lucide-react";
import { Separator } from "../ui/separator";
import type { MapType } from "@/features/map/lib/mapTypes";

type HeaderProps = {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  mapType: MapType;
  setMapType: React.Dispatch<React.SetStateAction<MapType>>;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({
  location,
  setLocation,
  mapType,
  setMapType,
  setIsSidebarOpen,
}: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <WeatherStorm className="-mb-2 size-6 md:size-8" />
        <h1 className="text-2xl font-semibold md:text-3xl">Weatherly</h1>
      </div>

      <Separator className="order-1" />

      <div className="header:order-0 header:mx-0 order-1 mx-auto flex items-center gap-2">
        <CityPicker location={location} setLocation={setLocation} />
        <Separator orientation="vertical" />
        <MapTypePicker mapType={mapType} setMapType={setMapType} />
      </div>

      <div className="flex items-center gap-6 md:gap-10">
        <ThemeSwitcher />
        <Hamburger
          className="size-6 rotate-180 cursor-pointer lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      </div>
    </header>
  );
}
