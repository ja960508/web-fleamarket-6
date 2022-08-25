import { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../context/UserInfoContext';
import { remote } from '../lib/api';
import { useSearchParams } from '../lib/Router';
import { ProductPreviewType } from '../types/product';

function useProductInfiniteScroll(loader: React.RefObject<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<ProductPreviewType[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const { userId } = useContext(UserInfoContext);
  const searchParams = useSearchParams();
  const categoryId = searchParams('categoryId');

  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isLoading) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
        const userQueryString = userId ? `userId=${userId}&` : '';
        const categoryQueryString = categoryId
          ? `categoryId=${categoryId}&`
          : '';
        const pageQueryString = `page=${page}`;
        const { data } = await remote.get(
          '/product?' + categoryQueryString + userQueryString + pageQueryString,
        );
        const lastPage = Math.ceil(data.totalCount / 10);

        setProducts((prev) => [...prev, ...data.data]);
        setIsLoading(false);
        setIsLastPage(lastPage === page);
      }
    };

    let observer: IntersectionObserver;

    if (loader.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1.0,
      });
      observer.observe(loader.current);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, [loader, categoryId, isLoading, page, userId]);

  return { products, isLastPage };
}

export default useProductInfiniteScroll;
