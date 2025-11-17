import React, { lazy, Suspense } from "react";

const LazyProductPage = lazy(() => import("./ProductPage"));

import type { Product } from "../../model/product"; // adjust import if needed

interface ProductPageProps {
  product: Product;
  children?: React.ReactNode;
}

const ProductPage = (props: ProductPageProps) => (
  <Suspense fallback={null}>
    <LazyProductPage {...props} />
  </Suspense>
);

export default ProductPage;
