import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Rating,
  Snackbar,
  Stack,
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
  const [errors, setErrors] = useState<[string, string]>(["", ""]);

  function displaySnackbar(text: string, type: "success" | "error" = "error") {
    setSnackOpen(true);
    setSnackText(text);
    setSnackType(type);
  }

  function validateMessage(text: string) {
    return text.trim().length === 0 ? "Message is required!" : "";
  }

  function setReviewMessage(text: string) {
    setErrors([errors[0], validateMessage(text)]);
    setMessage(text);
  }

  function validateRating(rating: number) {
    return rating === 0 ? "Rating is required!" : "";
  }

  function setReviewRating(rating: number) {
    setErrors([validateRating(rating), errors[1]]);
    setRating(rating);
  }

  function validateInput() {
    const messages: [string, string] = [
      validateRating(rating),
      validateMessage(message),
    ];
    setErrors(messages);
    return messages;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // validate input
    const errors = validateInput();
    if (!!errors[0] || !!errors[1]) {
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
            <Stack>
              <Rating
                sx={{ alignSelf: "center" }}
                size="large"
                precision={1}
                value={rating}
                onChange={(_, value) => setReviewRating(value ?? 0)}
              ></Rating>
              <Typography color="error" variant="caption">
                {errors[0]}
              </Typography>
            </Stack>

            <TextField
              multiline
              minRows={5}
              maxRows={10}
              value={message}
              onChange={(e) => setReviewMessage(e.target.value)}
              error={!!errors[1]}
              helperText={errors[1]}
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
