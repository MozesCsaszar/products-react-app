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
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.5rem",
        paddingY: "1rem",
      }}
    >
      <ProductItem
        product={product}
        showReview={false}
        fetchProduct={() => {}}
      ></ProductItem>

      <Button component={Link} to={`/products/${product.id}`}>
        View More
      </Button>
    </Paper>
  );
};

export default ProductListItem;
