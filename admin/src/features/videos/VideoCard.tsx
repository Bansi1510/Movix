import { Link } from "react-router-dom";

import {
  Eye,
  Crown,
  MoreVertical,
  Pencil,
  Trash2,
  Calendar,
  Languages,
  Film,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    genre: string;
    language: string;
    views: number;
    type: string;
    createdAt: string;
  };

  onDelete: (id: string) => void;
}

const VideoCard = ({
  video,
  onDelete,
}: VideoCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-52 w-full object-cover"
        />

        {/* Premium Badge */}
        {video.type === "PREMIUM" && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
            <Crown className="h-3 w-3" />
            Premium
          </div>
        )}

        {/* Action Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-3 top-3"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/videos/${video.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                to={`/videos/edit/${video.id}`}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-500"
              onClick={() =>
                onDelete(video.id)
              }
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">
          {video.title}
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {video.description}
        </p>

        {/* Genre & Language */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
            <Film className="h-3 w-3" />
            {video.genre}
          </div>

          <div className="flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs">
            <Languages className="h-3 w-3" />
            {video.language}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            {video.views.toLocaleString()}
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(
              video.createdAt
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;