import { Paper, Rating, Typography } from "@mui/material";
import { type FC } from "react";
import type { Review } from "../../model/review";

interface ReviewListItemProps {
  review: Review;
}

const ReviewListItem: FC<ReviewListItemProps> = ({ review }) => (
  <Paper
    sx={{
      padding: "1rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
    elevation={3}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "1rem",
      }}
    >
      <Typography variant="h6">
        {new Date(review.createdAt).toDateString()}
      </Typography>
      <Rating
        sx={{ alignSelf: "center" }}
        className="rating"
        readOnly
        value={review.rating}
        precision={0.1}
        size="large"
      />
    </div>

    <Typography sx={{ margin: "0.5rem 0", width: "80%" }}>
      {review.text}
    </Typography>
  </Paper>
);

export default ReviewListItem;
