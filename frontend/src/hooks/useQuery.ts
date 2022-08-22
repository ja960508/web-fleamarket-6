import { useEffect, useState } from 'react';
import memoryCache from '../lib/MemoryCache';

export type QueryKey = string;
export type QueryFn<T> = () => Promise<T>;
export type RefetchArgs = any[];

/**
 * queryKey: 캐시 데이터의 unique key
 * queryFn: 데이터 패칭용 함수 -> 추후에 refetchOnFocus 기능 구현 시 사용 예정
 * refetchArgs: queryFn에 사용되는 파라미터가 변경되었을 때 refetch 하기 위한 도구.
 * ex) useQuery('category', () => getCategory(categoryId), [categoryId])
 */

function useQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFn<T>,
  refetchArgs: RefetchArgs = [],
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchFromRemote() {
      try {
        setIsLoading(true);

        const result = await queryFn();

        memoryCache.setCacheData(queryKey, queryFn, {
          fetchedData: result,
          queryOptions: refetchArgs,
        });

        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    const cacheData = memoryCache.getCacheData(queryKey, refetchArgs);

    if (!cacheData) {
      fetchFromRemote();
      return;
    }

    setData(cacheData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, ...refetchArgs]);

  return { data, isLoading };
}

export default useQuery;
