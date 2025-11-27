import { Button, Paper, Typography } from "@mui/material";
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
          sx={{
            display: "flex",
            width: "100vw",
            height: "100vh",
            padding: "1rem",
          }}
        >
          <div
            className="forms"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "calc(33vw + 2rem)",
              minWidth: "calc(350px + 2rem)",
              maxWidth: "calc(500px + 2rem)",
              height: "100%",
              padding: "1rem",
            }}
          >
            <ProductForm product={product} fetchProduct={fetchProduct} />
            <ReviewForm productId={product.id} fetchProduct={fetchProduct} />
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
          <div className="review-list" style={{ flex: 1, padding: "1rem" }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textTransform: "uppercase" }}
            >
              Reviews
            </Typography>
            <ReviewList reviews={product.reviews}></ReviewList>
          </div>
        </Paper>
      </>
    )
  );
};

export default ProductPage;
