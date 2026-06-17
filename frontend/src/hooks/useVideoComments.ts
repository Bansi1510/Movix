import { getVideoComments } from "@/apis/video.api";
import { useQuery } from "@tanstack/react-query";

export const useVideoComments = (
  videoId: string
) => {
  return useQuery({
    queryKey: ["comments", videoId],
    queryFn: () =>
      getVideoComments(videoId),
    enabled: !!videoId,
  });
};