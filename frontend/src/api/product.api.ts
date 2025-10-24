import axios from "axios";
import type { ProductForm } from "../interface/product.interface";

export const productsApi = () => {
  const createProductApi = async (details: ProductForm) => {
    const response = await axios.post("/api/products", {
      name: details.name,
      price: details.price,
      image: details.image,
    });
    return response.data;
  };

  const getProductsApi = async () => {
    const response = await axios.get("/api/products");
    return response.data;
  };

  const updateProductApi = async ({
    id,
    details,
  }: {
    id: string;
    details: ProductForm;
  }) => {
    console.log("api", id, details);
    const response = await axios.put(`/api/products/${id}`, {
      name: details.name,
      price: details.price,
      image: details.image,
    });
    return response.data;
  };
  const deleteProductApi = async (id: string) => {
    const response = await axios.delete(`/api/products/${id}`);
    return response.data;
  };
  return {
    createProductApi,
    getProductsApi,
    deleteProductApi,
    updateProductApi,
  };
};
