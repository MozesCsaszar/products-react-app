import { Paper, Stack, TextField, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { useDeferredValue, useEffect, useState } from "react";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import ProductList from "../ProductList/ProductList";

const navSX = (theme: Theme) =>
  ({
    display: "flex",
    position: "sticky",
    left: 0,
    right: 0,
    top: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
    backgroundColor: "white",
    zIndex: 10,
    margin: "-1rem -1rem",
    marginBottom: "1rem",
    padding: "1rem",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: "0.25rem",
      padding: "0.75rem",
      paddingBottom: "0.25rem",
    },
  } as const);

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const filteredProducts = useDeferredValue(
    products.filter(
      (product) =>
        product.name.toLowerCase().includes(filterValue) ||
        product.description.toLowerCase().includes(filterValue)
    ),
    products
  );

  // fetch products
  useEffect(() => {
    // Fetch products from an API or data source
    ProductAPI.getProducts()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
      })
      .catch(() => {
        setError("Failed to fetch products.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Stack sx={{ padding: "1rem", minWidth: "100vw", minHeight: "100vh" }}>
      <Paper sx={(t) => navSX(t)}>
        <TextField
          sx={{
            flex: 1,
          }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value.toLowerCase())}
          label="Search Products"
          variant="outlined"
        />
        <Typography
          sx={{
            // flex: 1,
            minWidth: "10em",
          }}
          variant="h6"
        >
          {filteredProducts.length} / {products.length} Products
        </Typography>
      </Paper>
      <ErrorPanel error={error} loading={loading}>
        <ProductList products={filteredProducts} />
      </ErrorPanel>
    </Stack>
  );
};
export default ProductsPage;
