import {
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Video } from "@/types/video.types";
import { useLikeVideo } from "@/hooks/useLikeVideo";

interface Props {
  video: Video;
}

const VideoActions = ({ video }: Props) => {
  const {
    mutate: likeVideo,
    isPending,
  } = useLikeVideo();

  const handleShare = async () => {
    await navigator.clipboard.writeText(
      window.location.href
    );
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button
        variant={
          video.isLiked
            ? "default"
            : "secondary"
        }
        onClick={() => likeVideo(video.id)}
        disabled={isPending}
      >
        <Heart
          className={`mr-2 h-4 w-4 ${video.isLiked
              ? "fill-current"
              : ""
            }`}
        />
        {video._count.likes}
      </Button>

      <Button variant="secondary">
        <MessageCircle className="mr-2 h-4 w-4" />
        {video._count.comments}
      </Button>

      <Button
        variant="secondary"
        onClick={handleShare}
      >
        <Share2 className="mr-2 h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default VideoActions;