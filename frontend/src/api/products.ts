import type { Product } from "../model/product";

const URL_BASE = "http://localhost:8055";

class ProductsAPI {
  constructor() {}

  async getProducts() {
    return fetch(`${URL_BASE}/products`).then((res) => res.json());
  }

  async getProductById(id: string) {
    return fetch(`${URL_BASE}/products/${id}`).then((res) => res.json());
  }

  async updateProduct(product: Product) {
    return fetch(`${URL_BASE}/products/${product.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => res.json());
  }

  async postReview(id: string, rating: number, text: string) {
    const review = {
      rating,
      text,
    };

    return fetch(`${URL_BASE}/products/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }).then((res) => res.json());
  }
}

export default new ProductsAPI();
