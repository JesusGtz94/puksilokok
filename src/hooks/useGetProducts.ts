import { getProducts } from "@/api/products/productsApi";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery({
    queryKey: QUERY_KEYS.products,
    queryFn: getProducts,
  });
};
