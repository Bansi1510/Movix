import {
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Video } from "@/types/video.types";

interface Props {
  video: Video;
}

const VideoActions = ({
  video,
}: Props) => {
  const handleShare = async () => {
    await navigator.clipboard.writeText(
      window.location.href
    );
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <Button variant="secondary">
        <Heart className="mr-2 h-4 w-4" />
        Like
      </Button>

      <Button variant="secondary">
        <MessageCircle className="mr-2 h-4 w-4" />
        Comment
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