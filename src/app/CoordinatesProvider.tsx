import { createContext, useContext, useState, type ReactNode } from "react";

type coords = {
  lat: number;
  lng: number;
};

type CoordinatesContextType = {
  coordinates: coords;
  setCoordinates: React.Dispatch<React.SetStateAction<coords>>;
};

type CoordinatesProviderProps = {
  children: ReactNode;
};

const CoordinatesContext = createContext<undefined | CoordinatesContextType>(
  undefined,
);

export default function CoordinatesProvider({
  children,
}: CoordinatesProviderProps) {
  const [coordinates, setCoordinates] = useState<coords>({
    lat: 26.82,
    lng: 30.8,
  });

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  );
}

export const useCoordinates = () => {
  const context = useContext(CoordinatesContext);
  if (!context)
    throw new Error("use coordinates must be used in a coordinates provider");
  return context;
};
