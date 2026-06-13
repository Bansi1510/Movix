import {
  BadgeIndianRupee,
  Clock,
  Lock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface Props {
  video: {
    title: string;
    description: string;
    thumbnail: string;
    duration: number;
    price: number;
  };
}

const VideoPaymentCard = ({
  video,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="aspect-video w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div className="flex items-center gap-2">
          <Badge className="bg-red-600">
            <Lock className="mr-1 h-3 w-3" />
            PREMIUM
          </Badge>
        </div>

        <h2 className="text-xl font-semibold">
          {video.title}
        </h2>

        <p className="text-sm text-muted-foreground">
          {video.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {Math.ceil(video.duration / 60)} min
          </div>

          <div className="flex items-center gap-1 text-xl font-bold text-primary">
            <BadgeIndianRupee className="h-5 w-5" />
            {video.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPaymentCard;