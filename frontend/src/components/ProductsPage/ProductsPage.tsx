import { TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ProductList from "../ProductList/ProductList";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(filterValue) ||
      product.description.toLowerCase().includes(filterValue)
  );

  // fetch products
  useEffect(() => {
    // Fetch products from an API or data source
    ProductAPI.getProducts().then((fetchedProducts) => {
      setProducts(fetchedProducts);
    });
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <div
        className="filter"
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginBottom: "1rem",
          gap: "1rem",
        }}
      >
        <TextField
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value.toLowerCase())}
          label="Search Products"
          variant="outlined"
        />
        <Typography variant="h6">
          {filteredProducts.length} / {products.length} Products Match Query
        </Typography>
      </div>
      <ProductList products={filteredProducts} />
    </div>
  );
};
export default ProductsPage;
