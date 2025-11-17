import { type FC } from "react";
import type { Product } from "../../model/product";
import styles from "./ProductPage.module.css";

interface ProductPageProps {
  product: Product;
}

const ProductPage: FC<ProductPageProps> = ({ product }) => (
  <div className={styles.ProductPage}>{product.name}</div>
);

export default ProductPage;
