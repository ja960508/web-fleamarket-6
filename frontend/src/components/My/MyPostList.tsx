import React from 'react';
import { ProductPreviewType } from '../../types/product';
import ProductItem from '../Product/ProductItem';

function MyPostList({ products }: { products: ProductPreviewType[] }) {
  const isNotEmpty = products.length;

  return isNotEmpty ? (
    <ul>
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </ul>
  ) : (
    <div>관심을 표시한 상품이 없습니다.</div>
  );
}

export default MyPostList;
