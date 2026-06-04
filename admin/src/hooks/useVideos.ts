import { getAllVideos } from "@/apis/video.api";
import type { VideosResponse } from "@/types/video.types";
import { useQuery } from "@tanstack/react-query";


interface VideoFilters {
  page: number;
  search?: string;
  genre?: string;
  language?: string;
  type?: string;
}

export const useVideos = (
  filters: VideoFilters
) => {
  return useQuery<VideosResponse>({
    queryKey: ["videos", filters],

    queryFn: () =>
      getAllVideos(filters),

    placeholderData: (prev) => prev,
  });
};