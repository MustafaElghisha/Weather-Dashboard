import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./ThemeProvider";
import CoordinatesProvider from "./CoordinatesProvider";
import App from "./App";

const queryClient = new QueryClient();

export default function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CoordinatesProvider>
          <App />
        </CoordinatesProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
