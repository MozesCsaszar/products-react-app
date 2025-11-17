const URL_BASE = "http://localhost:8055";

class ProductsAPI {
  constructor() {}

  async getProducts() {
    return fetch(`${URL_BASE}/products`).then((res) => res.json());
  }

  async getProductById(id: string) {
    return fetch(`${URL_BASE}/products/${id}`).then((res) => res.json());
  }
}

export default new ProductsAPI();
