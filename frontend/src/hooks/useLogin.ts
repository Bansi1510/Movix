import { loginUser } from "@/apis/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};