import { QueryFn, QueryKey, RefetchArgs } from '../../hooks/useQuery';

const CACHE_EXPIRE = 1000 * 30;

interface QueryCache {
  [queryKey: QueryKey]: {
    updateFn: () => Promise<any>;
    cacheData: any;
    prevQueryOptions?: string;
  };
}

interface TimerMap {
  [queryKey: QueryKey]: NodeJS.Timer;
}

class MemoryCache {
  private queryCache: QueryCache;
  private timerMap: TimerMap;
  constructor() {
    this.queryCache = {};
    this.timerMap = {};
  }

  private registerExpire(queryKey: QueryKey) {
    if (this.timerMap[queryKey]) {
      clearTimeout(this.timerMap[queryKey]);
    }

    this.timerMap[queryKey] = setTimeout(() => {
      this.removeCacheData(queryKey);
    }, CACHE_EXPIRE);
  }

  private isStaleCache(queryKey: QueryKey, refetchArgs?: RefetchArgs) {
    if (!refetchArgs) return false;

    const prevQueryOptions = this.queryCache[queryKey]?.prevQueryOptions;
    if (!prevQueryOptions) return true;

    return prevQueryOptions !== JSON.stringify(refetchArgs);
  }

  private parseQueryOption(refetchArgs?: RefetchArgs) {
    return refetchArgs?.every((arg) => Boolean(arg))
      ? JSON.stringify(refetchArgs)
      : undefined;
  }

  getCacheData(queryKey: QueryKey, refetchArgs?: RefetchArgs) {
    if (this.isStaleCache(queryKey, refetchArgs)) return null;

    return this.queryCache[queryKey]?.cacheData;
  }

  setCacheData<T>(
    queryKey: QueryKey,
    queryFn: QueryFn<T>,
    dataInfo: {
      fetchedData: T;
      queryOptions?: RefetchArgs;
    },
  ) {
    const { fetchedData, queryOptions } = dataInfo;

    this.queryCache[queryKey] = {
      updateFn: queryFn,
      cacheData: fetchedData,
      prevQueryOptions: this.parseQueryOption(queryOptions),
    };

    this.registerExpire(queryKey);
  }

  removeCacheData(queryKey: QueryKey) {
    if (!this.queryCache[queryKey]) return;
    delete this.queryCache[queryKey];
  }
}

const memoryCache = new MemoryCache();

export default memoryCache;
