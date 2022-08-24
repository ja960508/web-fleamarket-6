import { useContext, useEffect, useState } from 'react';
import { UserInfoContext } from '../context/UserInfoContext';
import useGetProducts from './useGetProducts';

function useProductInfiniteScroll(loader: React.RefObject<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const { products, isLastPage, getProducts } = useGetProducts();
  const { isAuthorizing } = useContext(UserInfoContext);

  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isLoading && !isAuthorizing) {
        setIsLoading(true);
        await getProducts();
        setIsLoading(false);
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
  }, [loader, getProducts, isLoading, isAuthorizing]);

  return { products, isLastPage };
}

export default useProductInfiniteScroll;
