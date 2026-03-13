type CacheEntry = {
  data: any;
  timestamp: number;
};

const cache = new Map<string, CacheEntry>();

const TTL = 1000 * 60 * 10;

export function getCache(key: string) {
  const entry = cache.get(key);

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > TTL;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

export function setCache(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}