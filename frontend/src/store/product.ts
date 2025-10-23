import { create } from "zustand";
import type { Product } from "../interface/product.interface";

type Store = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductStore = create<Store>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
