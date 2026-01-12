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
    <Stack
      sx={{
        paddingBottom: "1rem",
        gap: "2rem",
        height: "100%",
      }}
    >
      {/* Post review form */}
      <Box
        sx={(theme) => ({
          flex: 0,
          marginX: "2rem",
          [theme.breakpoints.down("xs")]: { marginX: "1rem" },
        })}
      >
        <ReviewForm productId={product.id} fetchProduct={fetchProduct} />
      </Box>

      {/* Reviews */}
      <Box
        sx={(theme) => ({
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gridAutoRows: "minmax(200px, 30%)",
          gap: "2rem",
          width: "100%",
          overflowY: "auto",
          paddingX: "2rem",
          paddingY: "1rem",
          [theme.breakpoints.down("md")]: {
            overflowY: "visible",
            gridTemplateColumns: " minmax(250px, 1fr)",
            gridAutoRows: "225px",
          },
          [theme.breakpoints.down("xs")]: {
            padding: "0rem 0.75rem",
            gridTemplateColumns: " minmax(150px, 1fr)",
            gridAutoRows: "250px",
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
