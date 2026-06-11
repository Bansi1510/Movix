import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Skeleton,
} from "@/components/ui/skeleton";

const FeedSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Card key={index}>
          <Skeleton className="aspect-video w-full" />

          <CardContent className="space-y-3 p-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeedSkeleton;