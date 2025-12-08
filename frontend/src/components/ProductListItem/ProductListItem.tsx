import { Button, Paper } from "@mui/material";
import { type FC } from "react";
import { Link } from "react-router";
import type { Product } from "../../model/product";
import ProductItem from "../ProductItem/ProductItem";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={`/products/${product.id}`}>
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5rem",
          paddingY: "1rem",
          transition: "transform 0.1s ease-in-out",
          ":hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <ProductItem
          product={product}
          showReview={false}
          headingSize="h6"
          fetchProduct={() => {}}
        ></ProductItem>

        <Button
          sx={{ marginX: "1rem" }}
          component={Link}
          to={`/products/${product.id}`}
        >
          View More
        </Button>
      </Paper>
    </Link>
  );
};

export default ProductListItem;
