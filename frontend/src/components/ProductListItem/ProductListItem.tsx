import { Box, Button, Paper, Rating, Stack, Typography } from "@mui/material";
import { type FC } from "react";
import { Link } from "react-router";
import type { Product } from "../../model/product";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: FC<ProductListItemProps> = ({ product }) => {
  const nrReviews = product.reviews.length;
  const avgRating =
    product.reviews.reduce((prev, r) => r.rating + prev, 0) / (nrReviews || 1);

  return (
    <Link style={{ textDecoration: "none" }} to={`/products/${product.id}`}>
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "0.5rem",
          paddingY: "1rem",
          transition: "transform 0.1s ease-in-out",
          ":hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            textTransform: "uppercase",
            paddingX: "1rem",
            lineHeight: "100%",
            minHeight: "3.2rem",
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
              maxHeight: "5.2rem",
              overflowY: "auto",
            }}
          >
            {product.description}
          </Typography>
        </Stack>

        <Button sx={{ marginX: "1rem" }} variant="contained" disableElevation>
          View More
        </Button>
      </Paper>
    </Link>
  );
};

export default ProductListItem;
