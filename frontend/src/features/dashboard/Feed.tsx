import { useFeed } from "@/hooks/useFeed";
import { Film } from "lucide-react";
import FeedSkeleton from "./FeedSkeleton";
import FeedGrid from "./FeedGrid";



const Feed = () => {
  const {
    data: videos,
    isLoading,
  } = useFeed();

  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <Film className="h-5 w-5" />

        <h2 className="text-2xl font-semibold">
          Recommended For You
        </h2>
      </div>

      {isLoading ? (
        <FeedSkeleton />
      ) : (
        <FeedGrid videos={videos ?? []} />
      )}
    </>
  );
};

export default Feed;