import { createVideoAPI } from "@/apis/video.api"
import { useMutation } from "@tanstack/react-query"


export const useCreateVideo = () => {
  return useMutation({
    mutationFn: createVideoAPI
  })
}