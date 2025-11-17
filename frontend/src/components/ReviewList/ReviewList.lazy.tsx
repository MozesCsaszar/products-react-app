import React, { lazy, Suspense } from 'react';

const LazyReviewList = lazy(() => import('./ReviewList'));

const ReviewList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyReviewList {...props} />
  </Suspense>
);

export default ReviewList;
