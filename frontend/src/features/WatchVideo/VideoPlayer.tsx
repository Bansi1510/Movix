import { useEffect, useRef, useMemo } from "react";
import { Plyr } from "plyr-react";
import "plyr-react/plyr.css";

import type { SourceInfo } from "plyr";

import { useIncrementView } from "@/hooks/useIncrementView";

interface Props {
  videoId: string;
  videoUrl: string;
}

const VideoPlayer = ({ videoId, videoUrl }: Props) => {
  const viewCounted = useRef(false);
  const playerRef = useRef<any>(null);

  const { mutate: incrementView } = useIncrementView();

  // ✅ FIXED TYPE
  const source = useMemo<SourceInfo>(
    () => ({
      type: "video",
      sources: [
        {
          src: videoUrl,
          provider: "html5",
        },
      ],
    }),
    [videoUrl]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current?.plyr;

      if (!player) return;

      const duration = player.duration;
      if (!duration || viewCounted.current) return;

      const watchedPercentage =
        (player.currentTime / duration) * 100;

      if (watchedPercentage >= 33) {
        viewCounted.current = true;

        const currentProgress = player.currentTime;

        incrementView(videoId, {
          onSuccess: () => {
            player.currentTime = currentProgress;
            player.play();
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
          <Plyr ref={playerRef} source={source} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;