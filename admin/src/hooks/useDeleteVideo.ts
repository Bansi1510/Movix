import { deleteVideo } from "@/apis/video.api";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";


export const useDeleteVideo = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: deleteVideo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["videos"],
      });
    },
  });
};