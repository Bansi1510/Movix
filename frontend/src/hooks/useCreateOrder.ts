import { useMutation } from "@tanstack/react-query";

import { createOrder } from "@/apis/payment.api";

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};