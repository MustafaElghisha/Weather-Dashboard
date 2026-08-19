import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function HourlyForecastSkeleton() {
  return (
    <Card className="2xl:h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Hourly Forecast (48 Hours)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex scrollbar-none gap-6 overflow-scroll 2xl:h-full">
        {Array.from({ length: 48 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2 p-2">
            <Skeleton className="h-6 w-18" />
            <Skeleton className="size-8 rounded-full" />
            <Skeleton className="h-6 w-9" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
