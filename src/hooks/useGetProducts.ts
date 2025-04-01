import { getProducts } from "@/api/products/productsApi";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryDocumentSnapshot } from "firebase/firestore";

export const useGetProducts = (itemsPerPage?: number) => {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.products],
    initialPageParam: null,
    queryFn: ({ pageParam }: { pageParam: QueryDocumentSnapshot | null }) =>
      getProducts(pageParam, itemsPerPage),
    getNextPageParam: (lastPage) => {
      if (lastPage.products.length) {
        return lastPage.lastDoc;
      }
      return null;
    },
    select: (data) => data.pages.map((page) => page.products).flat(),
  });
};
