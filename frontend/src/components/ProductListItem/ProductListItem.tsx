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
    <Paper
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "0.5rem",
        padding: "1rem",
      }}
    >
      <Stack
        sx={{
          flex: 1,
          gap: "0.5rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            height: "2.5em",
            marginBottom: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {product.name}
        </Typography>

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
          }}
        >
          {product.description}
        </Typography>
      </Stack>

      <Button component={Link} to={`/products/${product.id}`}>
        View More
      </Button>
    </Paper>
  );
};

export default ProductListItem;
