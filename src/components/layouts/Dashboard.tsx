import MapLegend from "@/features/map/components/MapLegend";
import Map from "@/features/map/components/Map";
import type { MapType } from "@/features/map/lib/mapTypes";
import AdditionalInfo from "@/features/weather/components/AdditionalInfo";
import AdditionalInfoSkeleton from "@/features/weather/components/AdditionalInfoSkeleton";
import CurrentWeather from "@/features/weather/components/CurrentWeather";
import CurrentWeatherSkeleton from "@/features/weather/components/CurrentWeatherSkeleton";
import DailyForecast from "@/features/weather/components/DailyForecast";
import DailyForecastSkeleton from "@/features/weather/components/DailyForecastSkeleton";
import HourlyForecast from "@/features/weather/components/HourlyForecast";
import HourlyForecastSkeleton from "@/features/weather/components/HourlyForecastSkeleton";
import { Suspense } from "react";

type DashboardProps = {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  mapType: MapType;
};

export default function Dashboard({ setLocation, mapType }: DashboardProps) {
  return (
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
  );
}
