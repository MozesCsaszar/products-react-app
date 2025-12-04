import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import ProductItem from "../ProductItem/ProductItem";
import ReviewList from "../ReviewList/ReviewList";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string>("");

  const fetchProduct = useCallback(() => {
    // Fetch product details from an API or data source
    ProductAPI.getProductById(id ?? "")
      .then((fetchedProduct) => {
        setProduct(fetchedProduct);
      })
      .catch(() => {
        setError("Failed to fetch product details.");
      });
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Paper
      sx={(theme) => ({
        display: "flex",
        width: "100vw",
        height: "100vh",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          height: "auto",
        },
      })}
    >
      <ErrorPanel
        error={error}
        loading={!product}
        extraButtons={[
          <Button variant="contained" href="/products">
            Back to Products
          </Button>,
        ]}
      >
        {product && (
          <>
            {/* Product */}
            <Box
              sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "calc(33vw + 2rem)",
                minWidth: "calc(350px + 2rem)",
                maxWidth: "calc(500px + 2rem)",
                minHeight: "calc(100vh - 2rem)",
                paddingY: "1rem",
                [theme.breakpoints.down("md")]: {
                  width: "calc(60vw + 2rem)",
                  margin: "0 auto",
                  padding: "0",
                },
              })}
            >
              <ProductItem
                showReview={true}
                product={product!}
                fetchProduct={fetchProduct}
              />
              <Button sx={{ marginX: "1rem" }} onClick={() => navigate(-1)}>
                Back
              </Button>
            </Box>

            {/* Reviews */}
            <Stack
              sx={(theme) => ({
                maxHeight: "100vh",
                flex: 1,
                padding: "1rem 0",
                [theme.breakpoints.down("md")]: {
                  padding: "1rem 0",
                  paddingBottom: "0",
                },
              })}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
              >
                Reviews
              </Typography>
              <ReviewList reviews={product!.reviews}></ReviewList>
            </Stack>
          </>
        )}
      </ErrorPanel>
    </Paper>
  );
};

export default ProductPage;
