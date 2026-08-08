import Card from "../../../components/ui/Card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function SideCardSkeleton() {
  return (
    <Card
      className="from-secondary to-secondary/60 transition-transform duration-300 hover:scale-105"
      childrenClassName="flex flex-col gap-3"
    >
      <div className="flex justify-between">
        <Skeleton className="dark:bg-card h-7 w-15" />
        <Skeleton className="dark:bg-card h-7 w-13" />
      </div>
      <Skeleton className="dark:bg-card h-1 w-full" />
      <div className="flex justify-between text-xs">
        <Skeleton className="dark:bg-card h-4 w-2" />
        <Skeleton className="dark:bg-card h-4 w-2" />
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="dark:bg-card h-[25.5px] w-13" />
        ))}
      </div>
    </Card>
  );
}
