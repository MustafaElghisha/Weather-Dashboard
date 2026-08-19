import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DailyForecastSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Daily Forecast</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <Skeleton className="h-6 w-8.5" />
            </div>
            <Skeleton className="size-8 rounded-full" />
            <div className="flex-1">
              <Skeleton className="ml-auto h-6 w-8.5" />
            </div>
            <div className="flex-1">
              <Skeleton className="ml-auto h-6 w-8.5" />
            </div>
            <div className="flex-1">
              <Skeleton className="ml-auto h-6 w-8.5" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
