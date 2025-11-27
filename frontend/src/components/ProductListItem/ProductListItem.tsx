import { Button, Paper, Rating, Typography } from "@mui/material";
import { type FC } from "react";
import { Link } from "react-router";
import type { Product } from "../../model/product";
import styles from "./ProductListItem.module.css";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  const nrReviews = product.reviews.length;
  const avgRating =
    product.reviews.reduce((prev, r) => r.rating + prev, 0) / (nrReviews || 1);
  return (
    <Paper className={styles.ProductListItem}>
      <Typography variant="h5">{product.name}</Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Rating
          sx={{ alignSelf: "center" }}
          className="rating"
          readOnly
          value={avgRating}
          precision={0.1}
          size="large"
        />
        <Typography>&nbsp;&nbsp;&mdash;&nbsp;&nbsp;</Typography>
        <Typography variant="h6">{avgRating.toFixed(2)}</Typography>
      </div>

      <Typography variant="h6">
        {nrReviews} Review{nrReviews !== 1 ? "s" : ""}
      </Typography>
      <img src={product.image} alt={product.name} />
      <Typography>{product.description}</Typography>
      <Button component={Link} to={`/products/${product.id}`}>
        View More
      </Button>
    </Paper>
  );
};

export default ProductListItem;
