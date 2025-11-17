import React, { type JSX, lazy, Suspense } from "react";

const LazyProductListItem = lazy(() => import("./ProductListItem"));

const ProductListItem = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode }
) => (
  <Suspense fallback={null}>
    <LazyProductListItem {...props} />
  </Suspense>
);

export default ProductListItem;
