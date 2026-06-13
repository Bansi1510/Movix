import {
  Eye,
  Clock,
  Tag,
  PlayCircle,
  Lock,
  BadgeIndianRupee,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video } from "@/types/video.types";
import { useNavigate } from "react-router-dom";
import { checkVideoAccessApi } from "@/apis/payment.api";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({ video }: VideoCardProps) => {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const res = await checkVideoAccessApi(video.id);

      if (res.data.canWatch) {
        navigate(`/watch/${video.id}`);
      } else {
        navigate(`/payment/${video.id}`);
      }
    } catch {
      navigate(`/payment/${video.id}`);
    }
  };

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden rounded-2xl border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Duration */}
        <div className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
          {Math.floor(video.duration / 60)}:
          {(video.duration % 60).toString().padStart(2, "0")}
        </div>

        {/* Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
          <PlayCircle className="h-14 w-14 text-white drop-shadow-lg" />
        </div>

        {/* FREE / PREMIUM BADGE */}
        <div className="absolute left-2 top-2 flex gap-2">
          {video.type === "FREE" ? (
            <Badge className="bg-green-600 hover:bg-green-600">
              FREE
            </Badge>
          ) : (
            <Badge className="bg-red-600 hover:bg-red-600 flex items-center gap-1">
              <Lock className="h-3 w-3" />
              PREMIUM
            </Badge>
          )}

          {/* PRICE BADGE */}
          {video.type === "PREMIUM" && (
            <Badge className="bg-black/70 flex items-center gap-1">
              <BadgeIndianRupee className="h-3 w-3" />
              {video.price}
            </Badge>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="space-y-3 p-4">
        {/* TITLE */}
        <h3 className="line-clamp-1 text-base font-semibold">
          {video.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {video.description}
        </p>

        {/* META */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {video.views}
          </div>

          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {Math.ceil(video.duration / 60)}m
          </div>
        </div>

        {/* TAGS */}
        {video.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {video.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoCard;