import React, { lazy, Suspense } from 'react';

const LazyProductsPage = lazy(() => import('./ProductsPage'));

const ProductsPage = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProductsPage {...props} />
  </Suspense>
);

export default ProductsPage;
