import { type FC } from "react";
import type { Product } from "../../model/product";
import ProductListItem from "../ProductListItem/ProductListItem";
import styles from "./ProductList.module.css";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => (
  <div className={styles.ProductList}>
    {products.map((product) => (
      <ProductListItem key={product.id} product={product} />
    ))}
  </div>
);

export default ProductList;
