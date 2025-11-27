import { Button, TextField, Typography } from "@mui/material";
import { useState, type FC } from "react";
import type { Product } from "../../model/product";

interface ProductFormProps {
  product: Product;
  fetchProduct: () => void;
}

const ProductForm: FC<ProductFormProps> = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedProduct = {
      ...product,
      name,
      description,
    };

    console.log("Updated Product:", updatedProduct);
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <Typography sx={{ textTransform: "uppercase" }} variant="h5">
        Update Product
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={5}
        maxRows={10}
      />
      <Button type="submit">Update Product</Button>
    </form>
  );
};

export default ProductForm;
