import React from 'react';
import { StyledGuideMessage } from '../../pages/My';
import { ProductPreviewType } from '../../types/product';
import ProductItem from '../Product/ProductItem';

function MyLikePostList({ products }: { products: ProductPreviewType[] }) {
  const isNotEmpty = products.length;

  return isNotEmpty ? (
    <ul>
      {products.map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </ul>
  ) : (
    <StyledGuideMessage>등록된 상품이 없습니다.</StyledGuideMessage>
  );
}

export default MyLikePostList;
