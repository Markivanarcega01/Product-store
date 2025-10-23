import { productsApi } from "../api/product.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PRODUCT_QUERY_KEY } from "../shared/const/product.querykey";

const { createProductApi } = productsApi();

export const productService = () => {
  const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: [PRODUCT_QUERY_KEY.CREATE_PRODUCT],
      mutationFn: createProductApi,
      onSuccess: () => {
        console.log("Working");
      },
    });
  };

  return { useCreateProduct };
};
