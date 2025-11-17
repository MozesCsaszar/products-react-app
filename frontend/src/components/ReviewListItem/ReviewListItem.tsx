import React, { FC } from 'react';
import styles from './ReviewListItem.module.css';

interface ReviewListItemProps {}

const ReviewListItem: FC<ReviewListItemProps> = () => (
  <div className={styles.ReviewListItem}>
    ReviewListItem Component
  </div>
);

export default ReviewListItem;
