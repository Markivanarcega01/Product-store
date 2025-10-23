import axios from "axios";
import type { Product } from "../interface/product.interface";

export const productsApi = () => {
  const createProductApi = async (details: Product) => {
    const response = await axios.post("/api/products", {
      name: details.name,
      price: details.price,
      image: details.image,
    });
    return response.data;
  };
  return { createProductApi };
};
