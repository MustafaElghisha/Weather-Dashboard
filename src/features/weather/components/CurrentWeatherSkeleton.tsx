import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function CurrentWeatherSkeleton() {
  return (
    <Card className="sm:h-full sm:justify-stretch">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Current Weather
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 sm:h-full sm:justify-between">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-15 w-35" />
          <Skeleton className="size-14 rounded-full" />
          <Skeleton className="h-7 w-35" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-7 w-25" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <Skeleton className="h-6 w-15" />
              <Skeleton className="h-6 w-15" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
