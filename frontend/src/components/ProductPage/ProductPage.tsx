import { Box, Button, Paper, Typography } from "@mui/material";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ProductForm from "../ProductForm/ProductForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewList from "../ReviewList/ReviewList";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = useCallback(() => {
    // Fetch product details from an API or data source
    ProductAPI.getProductById(id ?? "").then((fetchedProduct) => {
      setProduct(fetchedProduct);
    });
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    product && (
      <>
        <Paper
          className={styles.ProductPage}
          sx={(theme) => ({
            display: "flex",
            width: "100vw",
            height: "100vh",
            padding: "1rem",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              height: "auto",
            },
          })}
        >
          {/* Product */}
          <Box
            className="forms"
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "calc(33vw + 2rem)",
              minWidth: "calc(350px + 2rem)",
              maxWidth: "calc(500px + 2rem)",
              minHeight: "calc(100vh - 2rem)",
              padding: "1rem",
              [theme.breakpoints.down("md")]: {
                width: "calc(60vw + 2rem)",
                margin: "0 auto",
                padding: "0",
              },
            })}
          >
            <ProductForm product={product} fetchProduct={fetchProduct} />
            <ReviewForm productId={product.id} fetchProduct={fetchProduct} />
            <Button onClick={() => navigate(-1)}>Back</Button>
          </Box>

          {/* Reviews */}
          <Box
            className="review-list"
            sx={(theme) => ({
              flex: 1,
              padding: "1rem",
              [theme.breakpoints.down("md")]: {
                padding: "1rem 0",
                paddingBottom: "0",
              },
            })}
          >
            <Typography
              variant="h5"
              gutterBottom
              style={{ textTransform: "uppercase" }}
            >
              Reviews
            </Typography>
            <ReviewList reviews={product.reviews}></ReviewList>
          </Box>
        </Paper>
      </>
    )
  );
};

export default ProductPage;
