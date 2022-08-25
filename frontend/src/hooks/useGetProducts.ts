import { useCallback, useContext, useState } from 'react';
import { UserInfoContext } from '../context/UserInfoContext';
import { remote } from '../lib/api';
import { useSearchParams } from '../lib/Router';
import { ProductPreviewType } from '../types/product';

function useGetProducts() {
  const [products, setProducts] = useState<ProductPreviewType[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const { userId } = useContext(UserInfoContext);
  const searchParams = useSearchParams();
  const categoryId = searchParams('categoryId');

  const getProducts = useCallback(async () => {
    setPage((prev) => prev + 1);
    const userQueryString = userId ? `userId=${userId}&` : '';
    const categoryQueryString = categoryId ? `categoryId=${categoryId}&` : '';
    const pageQueryString = `page=${page}`;
    const { data } = await remote.get(
      '/product?' + categoryQueryString + userQueryString + pageQueryString,
    );
    const lastPage = Math.ceil(data.totalCount / 10);
    setProducts((prev) => [...prev, ...data.data]);
    setIsLastPage(lastPage === page);
  }, [categoryId, page, userId]);

  const getProductsByUserId = useCallback(async () => {
    const userQueryString = userId ? `userId=${userId}&` : '';
    const filterQueryString = `filter=sale&`;

    if (!userId) {
      return;
    }

    const { data } = await remote.get(
      '/product?' + userQueryString + filterQueryString,
    );

    setProducts(data.data);
  }, [userId]);

  const getProductsByUserLike = useCallback(async () => {
    const userQueryString = userId ? `userId=${userId}&` : '';
    const filterQueryString = `filter=like&`;
    const locationQueryString = `location=my&`;

    if (!userId) {
      return;
    }

    const { data } = await remote.get(
      '/product?' + userQueryString + filterQueryString + locationQueryString,
    );

    setProducts(data.data);
  }, [userId]);

  return {
    products,
    isLastPage,
    getProducts,
    getProductsByUserId,
    getProductsByUserLike,
  };
}

export default useGetProducts;
