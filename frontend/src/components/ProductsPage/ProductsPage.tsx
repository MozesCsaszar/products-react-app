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
    gap: "2rem",
    zIndex: 10,
    margin: "-2rem",
    marginBottom: "2rem",
    padding: "1rem",
    paddingX: "2rem",
    borderRadius: "0",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: "0.25rem",
      padding: "0.75rem",
    },
  } as const);

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterValue, setFilterValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const normalizedFilterValue = filterValue.toLowerCase().trim();

  const filteredProducts = useDeferredValue(
    products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedFilterValue) ||
        product.description.toLowerCase().includes(normalizedFilterValue)
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
    <Stack sx={{ padding: "2rem", width: "100%", minHeight: "100vh" }}>
      <Paper sx={(t) => navSX(t)}>
        <Typography
          sx={{
            fontFamily: '"Luxurious Script", sans-serif',
            WebkitTextStroke: "1.25px #000510",
            fontSize: "2rem",
            userSelect: "none",
          }}
        >
          Your Product Reviews&trade;
        </Typography>
        <TextField
          sx={{
            flex: 1,
            maxWidth: "700px",
            marginX: "auto",
          }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          label={
            filterValue === ""
              ? "Search Products"
              : `${filteredProducts.length} / ${products.length} Products Match`
          }
          variant="outlined"
        />
      </Paper>
      <ErrorPanel error={error} loading={loading}>
        <ProductList products={filteredProducts} />
      </ErrorPanel>
    </Stack>
  );
};
export default ProductsPage;
