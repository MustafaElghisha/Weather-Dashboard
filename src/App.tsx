import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import DailyForecastSkeleton from "./components/skeletons/DailyForecastSkeleton";
import HourlyForecastSkeleton from "./components/skeletons/HourlyForecastSkeleton";
import CurrentWeatherSkeleton from "./components/skeletons/CurrentWeatherSkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import Map from "./components/Map";
import MapLegend from "./components/MapLegend";
import Sidebar from "./components/Sidebar";
import CityPicker from "./components/pickers/CityPicker";
import MapTypePicker, {
  type MapType,
} from "./components/pickers/MapTypePicker";
import { Suspense, useState } from "react";
import Hamburger from "/src/assets/hamburger.svg?react";
import WeatherStorm from "/src/assets/weatherStorm.svg?react";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Separator } from "@/components/ui/separator";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [mapType, setMapType] = useState<MapType>("precipitation");

  return (
    <>
      <div className="flex w-full flex-col gap-6 px-6 py-6 lg:w-[calc(100dvw-var(--sidebar-width))]">
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

        <main className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-[70dvh_auto_auto]">
          <div className="relative order-1 h-[50dvh] sm:col-span-2 sm:h-[60dvh] 2xl:col-span-4 2xl:h-auto">
            <Map mapType={mapType} setLocation={setLocation} />
            <MapLegend mapType={mapType} />
          </div>
          <section className="order-2 col-span-1 2xl:row-start-2 2xl:row-end-4">
            <Suspense fallback={<CurrentWeatherSkeleton />}>
              <CurrentWeather />
            </Suspense>
          </section>
          <section className="order-3 col-span-1 2xl:order-5 2xl:row-start-2 2xl:row-end-4">
            <Suspense fallback={<DailyForecastSkeleton />}>
              <DailyForecast />
            </Suspense>
          </section>
          <section className="order-4 col-span-1 sm:col-span-2 2xl:order-3 2xl:col-start-2 2xl:col-end-4 2xl:row-start-2 2xl:row-end-3">
            <Suspense fallback={<HourlyForecastSkeleton />}>
              <HourlyForecast />
            </Suspense>
          </section>
          <section className="order-5 col-span-1 sm:col-span-2 2xl:order-4 2xl:col-start-2 2xl:col-end-4 2xl:row-start-3 2xl:row-end-4">
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo />
            </Suspense>
          </section>
        </main>
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}

export default App;
