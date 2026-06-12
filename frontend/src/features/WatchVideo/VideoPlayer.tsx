import { useEffect, useRef } from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

import { useIncrementView } from "@/hooks/useIncrementView";

interface Props {
  videoId: string;
  videoUrl: string;
}

const VideoPlayer = ({ videoId, videoUrl }: Props) => {
  const viewCounted = useRef(false);
  const playerRef = useRef<any>(null);

  const { mutate: incrementView } = useIncrementView();

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current?.plyr;

      if (!player) return;

      const currentTime = player.currentTime;
      const duration = player.duration;

      if (!duration || viewCounted.current) return;

      const watchedPercentage =
        (currentTime / duration) * 100;

      if (watchedPercentage >= 33) {
        viewCounted.current = true;

        const currentProgress = player.currentTime; // IMPORTANT

        incrementView(videoId, {
          onSuccess: () => {
            player.currentTime = currentProgress;
            player.play(); // resume smoothly
          },
          onError: () => {
            player.currentTime = currentProgress;
            player.play();
          },
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoId, incrementView]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden bg-black">
        <div className="absolute top-0 left-0 w-full h-full">
          <Plyr
            ref={playerRef}
            key={videoId}   // IMPORTANT: stable key prevents reset bugs
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
    </div>
  );
};

export default VideoPlayer;