import { Box, Rating, Stack, Typography } from "@mui/material";
import { type FC } from "react";
import type { Product } from "../../model/product";
import ReviewForm from "../ReviewForm/ReviewForm";

interface ProductFormProps {
  product: Product;
  showReview: boolean;
  fetchProduct: () => void;
}

const ProductItem: FC<ProductFormProps> = ({
  product,
  showReview,
  fetchProduct,
}) => {
  const nrReviews = product.reviews.length;
  const avgRating =
    product.reviews.reduce((prev, r) => r.rating + prev, 0) / (nrReviews || 1);

  return (
    <Stack
      sx={{
        height: "100%",
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
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

        {showReview && (
          <ReviewForm
            productId={product.id}
            fetchProduct={fetchProduct}
          ></ReviewForm>
        )}

        <img
          style={{ width: "100%", borderRadius: "calc(1rem / 2)" }}
          src={product.image}
          alt={product.name}
        />

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
  );
};

export default ProductItem;
