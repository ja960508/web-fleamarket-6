import axios from 'axios';
import { useEffect, useState } from 'react';
import HomeNavbar from '../components/HomeNavbar/HomeNavbar';
import PostAddButton from '../components/Post/PostAddButton';
import ProductItem from '../components/Product/ProductItem';
import useQuery from '../hooks/useQuery';
import { remote } from '../lib/api';
import { useHistoryState, useSearchParams } from '../lib/Router/hooks';
import { ProductPreviewType } from '../types/product';

function Home() {
  const categoryIconURL = useHistoryState();
  const searchParams = useSearchParams();
  const categoryId = searchParams('categoryId');

  const { data: products } = useQuery<ProductPreviewType[]>(
    'products',
    async () => {
      const queryString = categoryId ? `?category=${categoryId}` : '';
      const { data } = await remote.get('/product' + queryString);
      return data.data;
    },
    [categoryId],
  );

  return (
    <main>
      <HomeNavbar currentCategoryIcon={categoryIconURL} />
      <ul>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      <PostAddButton />
    </main>
  );
}

export default Home;
