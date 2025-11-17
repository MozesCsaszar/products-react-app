import React, { FC } from 'react';
import styles from './ProductListItem.module.css';

interface ProductListItemProps {}

const ProductListItem: FC<ProductListItemProps> = () => (
  <div className={styles.ProductListItem}>
    ProductListItem Component
  </div>
);

export default ProductListItem;
