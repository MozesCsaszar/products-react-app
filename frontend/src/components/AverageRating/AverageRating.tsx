import { Box, Rating, Typography } from "@mui/material";
import { type FC } from "react";
import type { Review } from "../../model/review";

interface AverageRatingProps {
  reviews: Review[];
}

const AverageRating: FC<AverageRatingProps> = ({ reviews }) => {
  const nrReviews = reviews.length ?? 0;
  const avgRating =
    (reviews.reduce((prev, r) => r.rating + prev, 0) ?? 0) / (nrReviews || 1);
  return (
    <Box>
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
    </Box>
  );
};

export default AverageRating;
