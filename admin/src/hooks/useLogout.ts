import { useMutation } from "@tanstack/react-query";

import { logoutApi } from "@/apis/auth.api";

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutApi,
  });
};