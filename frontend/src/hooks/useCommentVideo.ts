import { commentOnVideo } from "@/apis/video.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCommentVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentOnVideo,

    onSuccess: (_, variables) => {
      console.log("Comment added");

      queryClient.invalidateQueries({
        queryKey: ["video", variables.videoId],
      });
    },

    onError: (error) => {
      console.log(error);
    },
  });
};