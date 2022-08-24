import { useRef } from 'react';
import Loading from '../components/commons/Loading';
import HomeNavbar from '../components/HomeNavbar/HomeNavbar';
import PostAddButton from '../components/Post/PostAddButton';
import ProductItem from '../components/Product/ProductItem';
import useProductInfiniteScroll from '../hooks/useProductInfiniteScroll';
import { useHistoryState } from '../lib/Router/hooks';

function Home() {
  const loader = useRef<HTMLDivElement>(null);
  const { isLastPage, products } = useProductInfiniteScroll(loader);
  const categoryIconURL = useHistoryState();

  return (
    <main>
      <HomeNavbar currentCategoryIcon={categoryIconURL} />
      <ul>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      {!isLastPage && <Loading ref={loader} />}
      <PostAddButton />
    </main>
  );
}

export default Home;
