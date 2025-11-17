import React, { lazy, Suspense } from 'react';

const LazyReviewListItem = lazy(() => import('./ReviewListItem'));

const ReviewListItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyReviewListItem {...props} />
  </Suspense>
);

export default ReviewListItem;
