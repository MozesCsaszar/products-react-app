import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Rating,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type FC } from "react";
import ProductAPI from "../../api/products";

interface ReviewFormProps {
  productId: string;
  fetchProduct: () => void;
}

const ReviewForm: FC<ReviewFormProps> = ({ productId, fetchProduct }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackType, setSnackType] = useState<"success" | "error">("error");
  const [snackText, setSnackText] = useState("");
  const [expanded, setExpanded] = useState(false);

  function displaySnackbar(
    message: string,
    snackType: "success" | "error" = "error"
  ) {
    setSnackType(snackType);
    setSnackOpen(true);
    setSnackText(message);
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (message.trim().length === 0) {
      displaySnackbar("Message is required!");
      return;
    }
    if (rating === 0) {
      displaySnackbar("Rating is required!");
      return;
    }

    ProductAPI.postReview(productId, rating, message)
      .then(() => {
        setMessage("");
        setRating(0);
        setExpanded(false);
        fetchProduct();
        displaySnackbar("Thank you for your review!", "success");
      })
      .catch(() => {
        displaySnackbar(
          "We encountered an error posting your review. Please try again later."
        );
      });
  }

  return (
    <>
      <Accordion expanded={expanded} onChange={() => setExpanded((e) => !e)}>
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
              required
              onChange={(e) => setMessage(e.target.value)}
            ></TextField>
            <Button type="submit">Post Review</Button>
          </form>
        </AccordionDetails>
      </Accordion>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={snackOpen}
        onClose={() => setSnackOpen(false)}
        key={snackText}
        autoHideDuration={2000}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackType}
          variant="filled"
        >
          {snackText}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewForm;
