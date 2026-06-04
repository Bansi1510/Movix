import { Skeleton } from "@/components/ui/skeleton";

const VideoSkeleton = () => {
  return (
    <div className="rounded-xl border p-4 space-y-3">
      <Skeleton className="h-52 w-full rounded-lg" />

      <Skeleton className="h-5 w-3/4" />

      <Skeleton className="h-4 w-full" />

      <Skeleton className="h-4 w-1/2" />
    </div>
  );
};

export default VideoSkeleton;