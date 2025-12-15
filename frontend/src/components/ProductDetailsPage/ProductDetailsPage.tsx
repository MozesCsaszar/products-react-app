import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import AverageRating from "../AverageRating/AverageRating";
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
            <ArrowBackIcon />
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
                justifyContent: "start",
                width: "calc(33vw + 2rem)",
                minWidth: "calc(350px + 2rem)",
                maxWidth: "calc(500px + 2rem)",
                paddingTop: "1rem",
                [theme.breakpoints.down("md")]: {
                  width: "calc(60vw + 2rem)",
                  margin: "0 auto",
                  padding: "0",
                  paddingTop: "1rem",
                  minWidth: "calc(350px - 2rem)",
                },
              })}
            >
              {/* Title + Back Button */}
              <Box sx={{ display: "flex", width: "100%" }}>
                <Button onClick={() => navigate(-1)}>
                  <ArrowBackIcon />
                </Button>
                <Typography
                  variant="h5"
                  sx={{
                    flex: 1,
                    textTransform: "uppercase",
                    lineHeight: "100%",
                    width: "fit-content",
                    alignContent: "center",
                    marginX: "auto",
                    paddingRight: "64px",
                  }}
                >
                  {product.name}
                </Typography>
              </Box>

              {/* Content */}
              <Stack
                sx={{
                  height: "100%",
                  gap: "0.5rem",
                  overflow: "auto",
                  padding: "1rem 2rem",
                }}
              >
                <img
                  style={{ width: "100%", borderRadius: "calc(1rem / 2)" }}
                  src={product.image}
                  alt={product.name}
                />

                <AverageRating reviews={product.reviews}></AverageRating>

                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: "1",
                    overflowY: "auto",
                    overflowX: "none",
                  }}
                  variant="h6"
                >
                  {product.description}
                </Typography>
              </Stack>
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
