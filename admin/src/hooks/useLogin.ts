import { useMutation } from "@tanstack/react-query";
import { loginApi } from "@/apis/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};