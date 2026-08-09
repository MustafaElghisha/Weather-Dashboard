import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useTheme } from "../../../app/ThemeProvider";
import { useCoordinates } from "../../../app/CoordinatesProvider";
import type { Dispatch, SetStateAction } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const API_KEY = import.meta.env.VITE_API_KEY;

type coords = {
  lat: number;
  lng: number;
};

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
      zoom={4}
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
          minZoom={2.5}
          tileSize={512}
          zoomOffset={-1}
        />
      ) : (
        <TileLayer
          url={`https://api.maptiler.com/maps/dataviz-v4/{z}/{x}/{y}@2x.png?key=zekAGYe1TUVm0MkRxA2k`}
          noWrap={true}
          minZoom={2.5}
          tileSize={512}
          zoomOffset={-1}
        />
      )}

      <TileLayer
        url={`https://tile.openweathermap.org/map/${mapType + "_new"}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        noWrap={true}
        minZoom={2}
        tileSize={512}
        zoomOffset={-1}
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
