import { getMyPurchase } from "@/apis/payment.api";
import { useQuery } from "@tanstack/react-query";


export const useUserPurchases = () => {
  return useQuery({
    queryKey: ["user-purchases"],

    queryFn: getMyPurchase
  });
};