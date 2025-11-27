import { Typography } from "@mui/material";
import { type FC } from "react";
import type { Product } from "../../model/product";

interface ProductFormProps {
  product: Product;
  fetchProduct: () => void;
}

const ProductForm: FC<ProductFormProps> = ({ product }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        alignItems: "center",
      }}
    >
      <Typography sx={{ textTransform: "uppercase" }} variant="h5">
        {product.name}
      </Typography>

      <Typography sx={{ width: "80%", padding: "2rem 0" }}>
        {product.description}
      </Typography>
    </div>
  );
};

export default ProductForm;
