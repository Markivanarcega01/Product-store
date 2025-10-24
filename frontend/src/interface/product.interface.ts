export interface Product {
  _id: string;
  name: string;
  price: number | string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductForm {
  name: string;
  price: number | string;
  image: string;
}
