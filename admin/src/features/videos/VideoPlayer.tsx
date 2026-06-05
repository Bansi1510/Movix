import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer = ({
  videoUrl,
}: VideoPlayerProps) => {
  return (
    <div className="h-full w-full bg-black">
      <Plyr
        source={{
          type: "video",
          sources: [
            {
              src: videoUrl,
              type: "video/mp4",
            },
          ],
        }}
        options={{
          autoplay: true,
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
        }}
      />
    </div>
  );
};

export default VideoPlayer;