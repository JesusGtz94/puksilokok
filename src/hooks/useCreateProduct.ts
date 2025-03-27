import { createProduct, Product, updateProduct } from "@/api";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/queryClient";
import { uploadImages } from "@/utils/storage";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const useCreateProduct = (
  queryParams?: MutationOptions<
    Product,
    unknown,
    Omit<Product, "id" | "images"> & { images: File[] }
  >
) => {
  return useMutation({
    mutationFn: async ({ images, ...product }) => {
      const { id } = await createProduct(product);
      const imgUrls = await uploadImages(images, `product-images/${id}`);

      await updateProduct({ images: imgUrls }, id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products });
      return { ...product, images: imgUrls, id };
    },
    ...queryParams,
  });
};
