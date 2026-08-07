import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function HourlyForecastSkeleton() {
  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      className="2xl:h-full"
      childrenClassName="flex gap-6 overflow-scroll 2xl:h-full"
    >
      {Array.from({ length: 48 }).map((_, index) => (
        <div className="flex flex-col items-center gap-2 p-2" key={index}>
          <Skeleton className="h-6 w-16.5" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-6 w-9" />
        </div>
      ))}
    </Card>
  );
}
