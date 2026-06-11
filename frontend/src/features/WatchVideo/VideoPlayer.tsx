import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

interface Props {
  videoUrl: string;
}

const VideoPlayer = ({
  videoUrl,
}: Props) => {
  return (
    <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-xl">
      <div className="aspect-video w-full">
        <Plyr
          source={{
            type: "video",
            sources: [
              {
                src: videoUrl,
                provider: "html5",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;