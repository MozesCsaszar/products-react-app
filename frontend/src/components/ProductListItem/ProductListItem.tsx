import { type FC } from "react";
import { Link } from "react-router";
import type { Product } from "../../model/product";
import styles from "./ProductListItem.module.css";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  const avgRating =
    product.reviews.reduce((prev, r) => r.rating + prev, 0) /
    product.reviews.length;
  return (
    <div className={styles.ProductListItem}>
      <h2>{product.name}</h2>
      <h3>Rating: {avgRating.toFixed(2)}</h3>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <Link to={`/products/${product.id}`}>View More</Link>
    </div>
  );
};

export default ProductListItem;
