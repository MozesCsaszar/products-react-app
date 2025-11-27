import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import ProductAPI from "../../api/products";
import styles from "./ReviewForm.module.css";

interface ReviewFormProps {
  productId: string;
  fetchProduct: () => void;
}

const ReviewForm: FC<ReviewFormProps> = ({ productId, fetchProduct }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    ProductAPI.postReview(productId, rating, message).then(() => {
      setMessage("");
      setRating(0);
      fetchProduct();
    });
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ArrowDropDownIcon fontSize="large" />}>
        <Typography
          sx={{
            textTransform: "uppercase",
            width: "100%",
            textAlign: "center",
          }}
          variant="h6"
        >
          Post a Review
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form
          className={styles.ReviewForm}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          onSubmit={onSubmit}
        >
          <Rating
            sx={{ alignSelf: "center" }}
            size="large"
            precision={1}
            value={rating}
            onChange={(_, value) => setRating(value ?? 0)}
          ></Rating>
          <TextField
            multiline
            minRows={5}
            maxRows={10}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></TextField>
          <Button type="submit">Post Review</Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReviewForm;
