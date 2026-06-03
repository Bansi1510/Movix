import { useQuery } from "@tanstack/react-query";
import { checkAuthApi } from "@/apis/auth.api";

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthApi,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};