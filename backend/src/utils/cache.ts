import NodeCache from 'node-cache';

// Create cache instance with 5 minutes TTL by default
const cache = new NodeCache({ 
  stdTTL: 300,
  checkperiod: 120,
  useClones: false
});

// Cache keys
export const CACHE_KEYS = {
  SERVICES: 'services:all',
  SERVICES_ACTIVE: 'services:active',
  PACKS: 'packs:all',
  PACKS_ACTIVE: 'packs:active',
  PROJECTS: 'projects:all',
  PROJECTS_FEATURED: 'projects:featured',
  DISCOUNTS_ACTIVE: 'discounts:active'
};

// Cache middleware
export const cacheMiddleware = (key: string | ((req: any) => string), ttl: number = 300) => {
  return (req: any, res: any, next: any) => {
    const cacheKey = typeof key === 'function' ? key(req) : key;
    const data = cache.get(cacheKey);
    
    if (data) {
      return res.json({
        success: true,
        data,
        cached: true
      });
    }
    
    // Store original send function
    const originalSend = res.json.bind(res);
    
    // Override send function
    res.json = (body: any) => {
      if (body?.success && body?.data) {
        cache.set(cacheKey, body.data, ttl);
      }
      return originalSend(body);
    };
    
    next();
  };
};

// Clear cache by pattern
export const clearCache = (pattern?: string) => {
  if (!pattern) {
    cache.flushAll();
    return;
  }
  
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.includes(pattern)) {
      cache.del(key);
    }
  });
};

// Clear specific cache
export const clearCacheKey = (key: string) => {
  cache.del(key);
};

// Get from cache or fetch
export const getOrSet = async <T>(
  key: string,
  fetchFn: () => Promise<T>,
  ttl: number = 300
): Promise<T> => {
  const cached = cache.get<T>(key);
  if (cached) {
    return cached;
  }
  
  const data = await fetchFn();
  cache.set(key, data, ttl);
  return data;
};

export default cache;
