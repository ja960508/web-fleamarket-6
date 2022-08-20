import { useEffect, useState } from 'react';
import memoryCache from '../lib/MemoryCache';

type QueryKey = string;
type QueryFn<T> = () => Promise<T>;

function useQuery<T>(
  queryKey: QueryKey,
  queryFn: QueryFn<T>,
  refetchArgs: any[] = [],
) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('rerender!');
    async function fetchFromRemote() {
      try {
        setIsLoading(true);

        const result = await queryFn();
        memoryCache.setCacheData(queryKey, queryFn, result);
        setData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    const cacheData = memoryCache.getCacheData(queryKey);

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
