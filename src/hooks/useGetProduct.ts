import { getProduct } from "@/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.product(id),
    queryFn: () => {
      if (!id) {
        return;
      }

      return getProduct(id);
    },
  });
};
