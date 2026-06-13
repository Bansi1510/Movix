import { checkAuthApi } from "@/apis/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useCheckAuth = (enabled: boolean) => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: checkAuthApi,
    enabled, // 🔥 IMPORTANT
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};