import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../../../components/ui/skeleton";

export default function AdditionalInfoSkeleton() {
  return (
    <Card className="2xl:h-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Additional Weather Info
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-8 2xl:grid 2xl:h-full 2xl:grid-cols-2 2xl:grid-rows-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex justify-between">
            <div className="flex gap-4">
              <Skeleton className="h-6 w-26" />
              <Skeleton className="size-6 rounded-full" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
