import { getProfile } from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";


export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    retry: false,
    staleTime: Infinity,
  });
};