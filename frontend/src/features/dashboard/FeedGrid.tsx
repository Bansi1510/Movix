import VideoCard from "./VideoCard";


interface FeedGridProps {
  videos: any[];
}

const FeedGrid = ({
  videos,
}: FeedGridProps) => {
  if (!videos.length) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">
          No recommendations available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
        />
      ))}
    </div>
  );
};

export default FeedGrid;