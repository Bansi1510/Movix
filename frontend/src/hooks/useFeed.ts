import { getFeed } from "@/apis/video.api";
import { useQuery } from "@tanstack/react-query";

export const useFeed = () => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: getFeed,
  });
};