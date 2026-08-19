import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SideCardSkeleton() {
  return (
    <Card className="transition-transform duration-300 hover:scale-105">
      <CardContent className="flex flex-col gap-3">
        <div className="flex justify-between">
          <Skeleton className="h-7 w-15" />
          <Skeleton className="h-7 w-13" />
        </div>
        <Skeleton className="h-1 w-full" />
        <div className="flex justify-between text-xs">
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-2" />
        </div>
        <div className="flex justify-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-[25.5px] w-13" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
