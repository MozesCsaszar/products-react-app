import React, { lazy, Suspense } from 'react';

const LazyProductList = lazy(() => import('./ProductList'));

const ProductList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProductList {...props} />
  </Suspense>
);

export default ProductList;
