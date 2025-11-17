import React, { FC } from 'react';
import styles from './ProductsPage.module.css';

interface ProductsPageProps {}

const ProductsPage: FC<ProductsPageProps> = () => (
  <div className={styles.ProductsPage}>
    ProductsPage Component
  </div>
);

export default ProductsPage;
