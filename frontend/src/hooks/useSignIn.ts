import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/apis/auth.api";

export const useSignUp = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};