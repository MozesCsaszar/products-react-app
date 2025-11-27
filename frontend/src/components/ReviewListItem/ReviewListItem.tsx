import { Paper, Typography } from "@mui/material";
import { type FC } from "react";
import type { Review } from "../../model/review";

interface ReviewListItemProps {
  review: Review;
}

const ReviewListItem: FC<ReviewListItemProps> = ({ review }) => (
  <Paper sx={{ padding: "1rem" }} elevation={3}>
    <Typography variant="h6">
      {new Date(review.createdAt).toDateString()} - Rating: {review.rating}
    </Typography>
    <Typography sx={{ margin: "0.5rem 0" }}>{review.text}</Typography>
  </Paper>
);

export default ReviewListItem;
