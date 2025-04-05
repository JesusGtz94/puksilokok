import { createProduct, Product, updateProduct } from "@/api";
import { uploadImages } from "@/api/storage";
import { toaster } from "@/components/ui/toaster";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { queryClient } from "@/queryClient";
import { MutationOptions, useMutation } from "@tanstack/react-query";

export const useCreateProduct = (
  queryParams?: MutationOptions<
    Product,
    unknown,
    Omit<Product, "id" | "images" | "titleLower"> & { images: File[] }
  >
) => {
  return useMutation({
    mutationFn: async ({ images, ...product }) => {
      const { id } = await createProduct(product);
      const imgUrls = await uploadImages(images, `product-images/${id}`, {
        onError: (file) =>
          toaster.error({
            title: "No se pudo obtener la url del archivo " + file.name,
          }),
      });

      await updateProduct({ images: imgUrls }, id);
      queryClient.removeQueries({ queryKey: QUERY_KEYS.products });
      return {
        ...product,
        titleLower: product.title.toLowerCase(),
        images: imgUrls,
        id,
      };
    },
    ...queryParams,
  });
};
