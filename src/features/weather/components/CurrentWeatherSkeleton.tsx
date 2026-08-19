import Card from "../../../components/Card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function CurrentWeatherSkeleton() {
  return (
    <Card
      title="Current Weather"
      className="sm:h-full sm:justify-stretch"
      childrenClassName="flex flex-col gap-6 sm:justify-between sm:h-full"
    >
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
    </Card>
  );
}
