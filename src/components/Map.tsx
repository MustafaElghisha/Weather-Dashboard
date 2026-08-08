import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { coords } from "../types/map";
import { useTheme } from "./ThemeProvider";
import { useCoordinates } from "./CoordinatesProvider";
import type { Dispatch, SetStateAction } from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

type MapProps = {
  mapType: string;
  setLocation: Dispatch<SetStateAction<string>>;
};

export default function Map({ mapType, setLocation }: MapProps) {
  const {
    coordinates: { lat, lng },
    setCoordinates,
  } = useCoordinates();
  const { theme } = useTheme();

  function onMapClick({ lat, lng }: coords) {
    setCoordinates({ lat, lng });
    setLocation("");
  }

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={3}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
      minZoom={2.5}
      maxBoundsViscosity={1.0}
      className="h-full w-full"
    >
      <MapClick coords={{ lat, lng }} onMapClick={onMapClick} />

      {theme === "dark" ? (
        <TileLayer
          url={`https://api.maptiler.com/maps/backdrop-v4-dark/{z}/{x}/{y}@2x.png?key=zekAGYe1TUVm0MkRxA2k`}
          noWrap={true}
          minZoom={2}
          tileSize={512}
          zoomOffset={-1}
        />
      ) : (
        <TileLayer
          url={`https://api.maptiler.com/maps/dataviz-v4/{z}/{x}/{y}@2x.png?key=zekAGYe1TUVm0MkRxA2k`}
          noWrap={true}
          minZoom={2}
          tileSize={512}
          zoomOffset={-1}
        />
      )}

      <TileLayer
        url={`https://tile.openweathermap.org/map/${mapType + "_new"}/{z}/{x}/{y}.png?appid=${API_KEY}`}
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
}

function MapClick({
  coords: { lat, lng },
  onMapClick,
}: {
  coords: coords;
  onMapClick: ({ lat, lng }: coords) => void;
}) {
  const map = useMap();
  map.panTo({ lat, lng });
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick({ lat, lng });
  });
  return null;
}
