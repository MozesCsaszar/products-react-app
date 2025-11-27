import { Button, Paper, Rating, Typography } from "@mui/material";
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
    <Paper className={styles.ProductListItem}>
      <Typography variant="h5">{product.name}</Typography>
      <Rating
        sx={{ alignSelf: "center" }}
        className="rating"
        readOnly
        value={avgRating}
        precision={0.1}
        size="large"
      />
      <img src={product.image} alt={product.name} />
      <Typography>{product.description}</Typography>
      <Button component={Link} to={`/products/${product.id}`}>
        View More
      </Button>
    </Paper>
  );
};

export default ProductListItem;
