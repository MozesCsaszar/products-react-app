import React, { FC } from 'react';
import styles from './ProductList.module.css';

interface ProductListProps {}

const ProductList: FC<ProductListProps> = () => (
  <div className={styles.ProductList}>
    ProductList Component
  </div>
);

export default ProductList;
