import axios from "axios";
import type { Product } from "../model/product";

const URL_BASE: string = import.meta.env.VITE_BASE_URL;

const randomToProdut: { [key: string]: number } = {};

function getRandom(id: string) {
  randomToProdut[id] ??= Math.floor(Math.random() * 10000);
  return randomToProdut[id];
}

class ProductsAPI {
  async getProducts() {
    return (await axios.get<Product[]>(`${URL_BASE}/products`)).data.map(
      // add random part to image URL
      (p) => ({
        ...p,
        image: `${p.image}?random=${getRandom(p.id)}`,
      })
    );
  }

  async getProductById(id: string) {
    const product = (await axios.get<Product[]>(`${URL_BASE}/products/${id}`))
      .data[0];
    return {
      ...product,
      image: `${product.image}?random=${getRandom(id)}`,
    };
  }

  async postReview(id: string, rating: number, text: string) {
    return axios.post(`${URL_BASE}/products/${id}/reviews`, {
      rating,
      text,
    });
  }
}

export default new ProductsAPI();
