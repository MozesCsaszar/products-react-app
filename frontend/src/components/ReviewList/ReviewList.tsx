import { Box, Stack, Typography } from "@mui/material";
import { type FC } from "react";
import type { Product } from "../../model/product";
import ReviewForm from "../ReviewForm/ReviewForm";
import ReviewListItem from "../ReviewListItem/ReviewListItem";

interface ReviewListProps {
  product: Product;
  fetchProduct: () => void;
}

const ReviewList: FC<ReviewListProps> = ({ product, fetchProduct }) => {
  const reviews = product.reviews;

  if (reviews.length === 0) {
    return (
      <Typography sx={{ alignContent: "center", flex: 1 }} variant="h4">
        No reviews to display...
      </Typography>
    );
  }

  return (
    <Stack sx={{ paddingRight: "1rem", gap: "1rem" }}>
      <Box sx={{ marginX: "1rem" }}>
        <ReviewForm productId={product.id} fetchProduct={fetchProduct} />
      </Box>

      <Box
        sx={(theme) => ({
          height: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gridAutoRows: "minmax(200px, 30%)",
          gap: "1rem",
          width: "100%",
          overflowY: "auto",
          paddingX: "1rem",
          [theme.breakpoints.down("md")]: {
            overflowY: "visible",
            padding: "0rem 1rem",
            height: "auto",
          },
          [theme.breakpoints.down("sm")]: {
            paddingX: "0.75rem",
            gridTemplateColumns: " minmax(250px, 1fr)",
            height: "auto",
          },
        })}
      >
        {reviews.map((review) => (
          <ReviewListItem key={review.id} review={review} />
        ))}
      </Box>
    </Stack>
  );
};

export default ReviewList;
