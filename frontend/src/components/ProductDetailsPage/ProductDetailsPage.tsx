import { Box, Button, Rating, Stack, Typography } from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ErrorPanel from "../ErrorPanel/ErrorPanel";
import ReviewList from "../ReviewList/ReviewList";

const ProductDetailsPage = () => {
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

  const nrReviews = product?.reviews.length ?? 0;
  const avgRating =
    (product?.reviews.reduce((prev, r) => r.rating + prev, 0) ?? 0) /
    (nrReviews || 1);

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        width: "100vw",
        height: "100vh",
        paddingX: "1rem",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          height: "auto",
          paddingX: "0",
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
                padding: "1rem",
                [theme.breakpoints.down("md")]: {
                  width: "calc(60vw + 2rem)",
                  margin: "0 auto",
                  padding: "0",
                  minWidth: "calc(350px - 2rem)",
                  paddingTop: "1rem",
                },
              })}
            >
              <Stack
                sx={{
                  height: "stretch",
                  overflowY: "auto",
                }}
              >
                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                    paddingX: "1rem",
                    lineHeight: "100%",
                    minHeight: "2.2rem",
                  }}
                >
                  {product.name}
                </Typography>

                {/* Content */}
                <Stack
                  sx={{
                    height: "100%",
                    gap: "0.5rem",
                    overflow: "auto",
                    paddingX: "1rem",
                  }}
                >
                  <img
                    style={{ width: "100%", borderRadius: "calc(1rem / 2)" }}
                    src={product.image}
                    alt={product.name}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Rating
                      sx={{ alignSelf: "center" }}
                      readOnly
                      value={avgRating}
                      precision={0.1}
                      size="large"
                    />
                    <Typography>&nbsp;&nbsp;&mdash;&nbsp;&nbsp;</Typography>
                    <Typography variant="h6">{avgRating.toFixed(2)}</Typography>
                  </Box>

                  <Typography variant="h6">
                    {nrReviews} Review{nrReviews !== 1 ? "s" : ""}
                  </Typography>

                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flex: "1",
                    }}
                  >
                    {product.description}
                  </Typography>
                </Stack>
              </Stack>

              <Button
                sx={{ marginX: "1rem", flex: 0, marginTop: "0.5rem" }}
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </Box>

            {/* Reviews */}
            <Stack
              sx={(theme) => ({
                paddingTop: "1rem",
                flex: 1,
                [theme.breakpoints.down("md")]: {
                  paddingBottom: "0",
                },
              })}
            >
              {/* Title */}
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Reviews
              </Typography>
              {/* Reviews */}
              <Box sx={{ minHeight: 0 }}>
                <ReviewList
                  fetchProduct={fetchProduct}
                  product={product!}
                ></ReviewList>
              </Box>
            </Stack>
          </>
        )}
      </ErrorPanel>
    </Box>
  );
};

export default ProductDetailsPage;
