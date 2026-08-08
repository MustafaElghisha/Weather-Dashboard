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
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mapType, setMapType] = useState<MapType>("precipitation");

  return (
    <>
      <div className="flex w-full flex-col gap-6 p-6 lg:w-[calc(100dvw-var(--sidebar-width))]">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex gap-4">
            <h2 className="text-xl font-semibold">City: </h2>
            <CityPicker />
          </div>
          <div className="flex gap-4">
            <h2 className="text-xl font-semibold">Map Type: </h2>
            <MapTypePicker mapType={mapType} setMapType={setMapType} />
          </div>
          <ThemeSwitcher />
          <Hamburger
            className="size-6 rotate-180 cursor-pointer lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-[70dvh_auto_auto]">
          <div className="relative order-1 h-[50dvh] sm:col-span-2 sm:h-[60dvh] 2xl:col-span-4 2xl:h-auto">
            <Map mapType={mapType} />
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
        </div>
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}

export default App;
