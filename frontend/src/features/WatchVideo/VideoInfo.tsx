import { Eye } from "lucide-react";

interface Props {
  video: any;
}

const VideoInfo = ({
  video,
}: Props) => {
  return (
    <div className="mt-5 space-y-3">
      <h1 className="text-3xl font-bold">
        {video.title}
      </h1>

      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        {video.views} views
      </div>

      <p className="text-muted-foreground">
        {video.description}
      </p>
    </div>
  );
};

export default VideoInfo;