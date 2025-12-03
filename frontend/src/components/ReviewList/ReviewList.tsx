import { Box } from "@mui/material";
import { type FC } from "react";
import type { Review } from "../../model/review";
import ReviewListItem from "../ReviewListItem/ReviewListItem";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: FC<ReviewListProps> = ({ reviews }) => (
  <Box
    sx={(theme) => ({
      height: "calc(100vh - 6rem)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gridAutoRows: "minmax(200px, 30%)",
      gap: "1rem",
      width: "100%",
      overflowY: "auto",
      padding: "1rem 1rem",
      [theme.breakpoints.down("md")]: {
        overflowY: "visible",
        padding: "1rem 0rem",
        height: "auto",
      },
    })}
  >
    {reviews.map((review) => (
      <ReviewListItem key={review.id} review={review} />
    ))}
  </Box>
);

export default ReviewList;
