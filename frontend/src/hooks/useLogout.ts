import { useMutation } from "@tanstack/react-query";

import { logout } from "@/apis/auth.api";

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};