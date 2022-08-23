import { useContext, useEffect, useRef, useState } from 'react';
import Loading from '../components/commons/Loading';
import HomeNavbar from '../components/HomeNavbar/HomeNavbar';
import PostAddButton from '../components/Post/PostAddButton';
import ProductItem from '../components/Product/ProductItem';
import { UserInfoContext } from '../context/UserInfoContext';
import useQuery from '../hooks/useQuery';
import { remote } from '../lib/api';
import { useHistoryState, useSearchParams } from '../lib/Router/hooks';
import { ProductPreviewType } from '../types/product';

function Home() {
  const { userId } = useContext(UserInfoContext);
  const categoryIconURL = useHistoryState();
  const searchParams = useSearchParams();
  const categoryId = searchParams('categoryId');
  const [products, setProducts] = useState<ProductPreviewType[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef<HTMLDivElement>(null);

  const { data } = useQuery<ProductPreviewType[]>(
    ['products', categoryId, page],
    async () => {
      const userQueryString = userId ? `userId=${userId}&` : '';
      const categoryQueryString = categoryId ? `categoryId=${categoryId}&` : '';
      const pageQueryString = `page=${page}`;
      const { data } = await remote.get(
        '/product?' + categoryQueryString + userQueryString + pageQueryString,
      );

      setProducts((prev) => [...prev, ...data.data]);
      return data.data;
    },
  );

  useEffect(() => {
    let observer: IntersectionObserver;

    if (loader.current) {
      observer = new IntersectionObserver(
        () => {
          setPage((prev) => prev + 1);
        },
        {
          threshold: 1.0,
        },
      );
      observer.observe(loader.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [loader]);

  return (
    <main>
      <HomeNavbar currentCategoryIcon={categoryIconURL} />
      <ul>
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
      <Loading ref={loader} />
      <PostAddButton />
    </main>
  );
}

export default Home;
