import Card from "../../../components/ui/Card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function AdditionalInfoSkeleton() {
  return (
    <Card
      title="Additional Weather Info"
      className="2xl:h-full"
      childrenClassName="flex flex-col gap-8 2xl:grid 2xl:grid-cols-2 2xl:grid-rows-3 2xl:h-full"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex gap-4">
            <Skeleton className="h-6 w-26" />
            <Skeleton className="size-6 rounded-full" />
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
      ))}
    </Card>
  );
}
