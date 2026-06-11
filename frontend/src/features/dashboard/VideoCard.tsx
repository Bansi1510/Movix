import {
  Eye,
  Clock,
  Tag,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";
import { Video } from "@/types/video.types";
import { useNavigate } from "react-router-dom";

interface VideoCardProps {
  video: Video;
}

const VideoCard = ({
  video,
}: VideoCardProps) => {
  console.log(video)
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/watch/${video.id}`)}
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg">
      <div className="relative overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
          {Math.floor(video.duration / 60)}:
          {(video.duration % 60)
            .toString()
            .padStart(2, "0")}
        </div>
      </div>

      <CardContent className="space-y-3 p-4">
        <div>
          <h3 className="line-clamp-1 font-semibold">
            {video.title}
          </h3>

          <p className="text-muted-foreground line-clamp-2 text-sm">
            {video.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {video.genre}
          </Badge>

          {video.type === "PREMIUM" && (
            <Badge>
              ₹{video.price}
            </Badge>
          )}
        </div>

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

        {video.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {video.tags
              .slice(0, 3)
              .map((tag: string) => (
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