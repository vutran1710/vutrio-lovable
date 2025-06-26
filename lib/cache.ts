// lib/cache.ts
const memoryCache = new Map<string, { data: any; timestamp: number }>();
const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour

export async function withCache<T>(
  key: string,
  fn: () => Promise<T>,
  ttl: number = DEFAULT_TTL,
): Promise<T> {
  const now = Date.now();
  const cached = memoryCache.get(key);

  if (cached && now - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fn();
  memoryCache.set(key, { data, timestamp: now });
  return data;
}
