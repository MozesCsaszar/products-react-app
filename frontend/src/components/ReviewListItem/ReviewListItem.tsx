import { Paper, Rating, Stack, Typography } from "@mui/material";
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
      minHeight: 0,
      gap: "0.5rem",
      transition: "transform 0.1s ease-in-out",
      ":hover": {
        transform: "scale(1.035)",
      },
    }}
    elevation={3}
  >
    {/* rating */}
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* title */}
      <Typography variant="h6">
        {new Date(review.createdAt).toDateString()}
      </Typography>

      {/* rating */}
      <Rating
        sx={{ alignSelf: "center" }}
        readOnly
        value={review.rating}
        precision={0.1}
        size="large"
      />
    </Stack>

    {/* review */}
    <Typography
      sx={{
        overflowY: "auto",
        paddingY: "0.25rem",
        paddingX: "1rem",
        width: "90%",
        alignContent: "center",
        flex: 1,
      }}
    >
      {review.text}
    </Typography>
  </Paper>
);

export default ReviewListItem;
