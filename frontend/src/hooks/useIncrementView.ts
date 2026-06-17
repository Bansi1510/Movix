import { incrementView } from "@/apis/video.api";
import { useMutation } from "@tanstack/react-query";


export const useIncrementView = () => {
  return useMutation({
    mutationFn: incrementView,
  });
};