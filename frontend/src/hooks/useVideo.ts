import { getVideo } from "@/apis/video.api";
import { useQuery } from "@tanstack/react-query";



export const useVideo = (videoId: string) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideo(videoId),
    enabled: !!videoId,
  });
};