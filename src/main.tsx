import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./components/ThemeProvider.tsx";
import CoordinatesProvider from "./components/CoordinatesProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CoordinatesProvider>
          <App />
        </CoordinatesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
