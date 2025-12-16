import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import type { Product } from "../../model/product";
import ProductListItem from "../ProductListItem/ProductListItem";

interface ProductListProps {
  products: Product[];
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <Typography sx={{ alignContent: "center", flex: 1 }} variant="h3">
        No products to display...
      </Typography>
    );
  }
  return (
    <Box
      sx={(theme) => ({
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "1fr",
        gap: "2rem",
        // rowGap: "1rem",
        [theme.breakpoints.down("lg")]: {
          gridTemplateColumns: "repeat(3, 1fr)",
        },
        [theme.breakpoints.down("md")]: {
          gridTemplateColumns: "repeat(2, 1fr)",
        },
        [theme.breakpoints.down("sm")]: {
          gridTemplateColumns: "repeat(1, 1fr)",
        },
      })}
    >
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </Box>
  );
};

export default ProductList;
