import axios from "axios";
import type { Product } from "../model/product";

const URL_BASE: string = import.meta.env.VITE_BASE_URL;

class ProductsAPI {
  constructor() {}

  async getProducts() {
    return (await axios.get<Product[]>(`${URL_BASE}/products`)).data;
  }

  async getProductById(id: string) {
    return (await axios.get<Product>(`${URL_BASE}/products/${id}`)).data;
  }

  async postReview(id: string, rating: number, text: string) {
    return axios.post(`${URL_BASE}/products/${id}/reviews`, {
      rating,
      text,
    });
  }
}

export default new ProductsAPI();
