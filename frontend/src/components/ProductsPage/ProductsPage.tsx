import { useEffect, useState } from "react";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ProductList from "../ProductList/ProductList";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from an API or data source
    ProductAPI.getProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);
  return <ProductList products={products} />;
};
export default ProductsPage;
