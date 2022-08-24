import { useEffect, useState } from 'react';
import useGetProducts from './useGetProducts';

function useProductInfiniteScroll(loader: React.RefObject<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const { products, isLastPage, getProducts } = useGetProducts();

  useEffect(() => {
    const onIntersect = async ([entry]: IntersectionObserverEntry[]) => {
      if (entry.isIntersecting && !isLoading) {
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
  }, [loader, getProducts, isLoading]);

  return { products, isLastPage };
}

export default useProductInfiniteScroll;
