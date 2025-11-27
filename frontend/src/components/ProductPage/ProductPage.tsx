import { Paper, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductAPI from "../../api/products";
import { type Product } from "../../model/product";
import ProductForm from "../ProductForm/ProductForm";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewList from "../ReviewList/ReviewList";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

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
        <div
          className={styles.ProductPage}
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "1rem",
          }}
        >
          <Paper
            className="forms"
            sx={{
              display: "flex",
              flexDirection: "column",
              minWidth: "calc(350px + 2rem)",
              height: "100%",
              padding: "1rem",
            }}
          >
            <ProductForm product={product} fetchProduct={fetchProduct} />
            <ReviewForm productId={product.id} fetchProduct={fetchProduct} />
          </Paper>
          <Paper className="review-list" sx={{ flex: 1, padding: "1rem" }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ textTransform: "uppercase" }}
            >
              Reviews
            </Typography>
            <ReviewList reviews={product.reviews}></ReviewList>
          </Paper>
        </div>
      </>
    )
  );
};

export default ProductPage;
