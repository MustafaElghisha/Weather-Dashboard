import { useState } from "react";
import type { MapType } from "@/features/map/lib/mapTypes";
import Header from "@/components/layouts/Header";
import Dashboard from "@/components/layouts/Dashboard";
import Sidebar from "@/components/layouts/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [mapType, setMapType] = useState<MapType>("precipitation");

  return (
    <>
      <div className="flex w-full flex-col gap-6 px-6 py-6 lg:w-[calc(100dvw-var(--sidebar-width))]">
        <Header
          location={location}
          setLocation={setLocation}
          mapType={mapType}
          setMapType={setMapType}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <Dashboard mapType={mapType} setLocation={setLocation} />
      </div>

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}

export default App;
