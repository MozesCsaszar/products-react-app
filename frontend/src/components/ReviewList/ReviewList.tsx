import { Box, Typography } from "@mui/material";
import { type FC } from "react";
import type { Review } from "../../model/review";
import ReviewListItem from "../ReviewListItem/ReviewListItem";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <Typography sx={{ alignContent: "center", flex: 1 }} variant="h4">
        No reviews to display...
      </Typography>
    );
  }

  return (
    <Box
      sx={(theme) => ({
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
        gridAutoRows: "minmax(200px, 30%)",
        gap: "1rem",
        width: "100%",
        overflowY: "auto",
        padding: "8px 1rem",
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
  );
};

export default ReviewList;
