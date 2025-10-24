import { productsApi } from "../api/product.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PRODUCT_QUERY_KEY } from "../shared/const/product.querykey";
import type { Product } from "../interface/product.interface";

const { createProductApi, getProductsApi, deleteProductApi, updateProductApi } =
  productsApi();

export const productService = () => {
  const useGetProducts = () => {
    return useQuery<Product[], Error>({
      queryKey: [PRODUCT_QUERY_KEY.GET_PRODUCT],
      queryFn: getProductsApi,
      refetchOnWindowFocus: false,
    });
  };
  const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationKey: [PRODUCT_QUERY_KEY.CREATE_PRODUCT],
      mutationFn: createProductApi,
      onSuccess: () => {
        //resetqueries another solution
        queryClient.invalidateQueries({
          queryKey: [PRODUCT_QUERY_KEY.GET_PRODUCT],
          refetchType: "inactive",
        });
      },
    });
  };

  const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [PRODUCT_QUERY_KEY.UPDATE_PRODUCT],
      mutationFn: updateProductApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [PRODUCT_QUERY_KEY.GET_PRODUCT],
        });
      },
    });
  };

  const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: [PRODUCT_QUERY_KEY.DELETE_PRODUCT],
      mutationFn: deleteProductApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [PRODUCT_QUERY_KEY.GET_PRODUCT],
        });
      },
    });
  };

  return {
    useCreateProduct,
    useGetProducts,
    useDeleteProduct,
    useUpdateProduct,
  };
};
