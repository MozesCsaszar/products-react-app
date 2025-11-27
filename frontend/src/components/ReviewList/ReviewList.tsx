import { type FC } from "react";
import type { Review } from "../../model/review";
import ReviewListItem from "../ReviewListItem/ReviewListItem";
import styles from "./ReviewList.module.css";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: FC<ReviewListProps> = ({ reviews }) => (
  <div
    className={styles.ReviewList}
    style={{
      maxHeight: "calc(100vh - 6rem)",
      height: "100%",
    }}
  >
    {reviews.map((review) => (
      <ReviewListItem key={review.id} review={review} />
    ))}
  </div>
);

export default ReviewList;
