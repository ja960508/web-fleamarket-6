type QueryKey = string;
type QueryFn<T> = () => Promise<T>;

const CACHE_EXPIRE = 1000 * 30;

interface QueryCache {
  [queryKey: QueryKey]: {
    updateFn: () => Promise<any>;
    cacheData: any;
  };
}

class MemoryCache {
  private queryCache: QueryCache;
  constructor() {
    this.queryCache = {};
  }

  private registerExpire(queryKey: QueryKey) {
    setTimeout(() => {
      this.removeCacheData(queryKey);
    }, CACHE_EXPIRE);
  }

  getCacheData(queryKey: QueryKey) {
    return this.queryCache[queryKey]?.cacheData;
  }

  setCacheData<T>(queryKey: QueryKey, queryFn: QueryFn<T>, fetchedData: T) {
    this.queryCache[queryKey] = {
      updateFn: queryFn,
      cacheData: fetchedData,
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
