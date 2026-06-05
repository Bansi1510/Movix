import { getVideoById } from "@/apis/video.api";
import { useQuery } from "@tanstack/react-query";

export const useVideoById = (
  videoId: string | null
) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId!),
    enabled: !!videoId,
  });
};