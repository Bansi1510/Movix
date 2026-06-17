import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeVideo } from "@/apis/video.api";

export const useLikeVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeVideo,

    onSuccess: (_, videoId) => {
      queryClient.invalidateQueries({
        queryKey: ["video", videoId],
      });
    },
  });
};