/**
 * Optimized client-side caching system
 * Provides efficient caching with TTL and LRU eviction
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
  hits: number
}

export class ClientCache {
  private cache: Map<string, CacheEntry<any>>
  private maxSize: number
  private defaultTTL: number

  constructor(maxSize = 100, defaultTTL = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map()
    this.maxSize = maxSize
    this.defaultTTL = defaultTTL

    // Initialize cache from localStorage if available
    if (typeof window !== 'undefined') {
      this.loadFromStorage()
    }
  }

  /**
   * Get data from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key)
      this.saveToStorage()
      return null
    }

    // Update hits and timestamp (LRU)
    entry.hits++
    entry.timestamp = Date.now()

    return entry.data as T
  }

  /**
   * Set data in cache with optional TTL
   */
  set<T>(key: string, data: T, ttl?: number): void {
    // Implement LRU eviction if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictLRU()
    }

    const now = Date.now()
    const entry: CacheEntry<T> = {
      data,
      timestamp: now,
      expiresAt: now + (ttl || this.defaultTTL),
      hits: 0
    }

    this.cache.set(key, entry)
    this.saveToStorage()
  }

  /**
   * Delete specific key from cache
   */
  delete(key: string): void {
    this.cache.delete(key)
    this.saveToStorage()
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear()
    this.saveToStorage()
  }

  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null
    let oldestTimestamp = Infinity

    for (const [key, entry] of this.cache.entries()) {
      if (entry.timestamp < oldestTimestamp) {
        oldestTimestamp = entry.timestamp
        oldestKey = key
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey)
    }
  }

  /**
   * Clean expired entries
   */
  cleanExpired(): void {
    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key)
      }
    }
    this.saveToStorage()
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const entries = Array.from(this.cache.values())
    return {
      size: this.cache.size,
      totalHits: entries.reduce((sum, entry) => sum + entry.hits, 0),
      avgHits: entries.length > 0
        ? entries.reduce((sum, entry) => sum + entry.hits, 0) / entries.length
        : 0
    }
  }

  /**
   * Save cache to localStorage (for persistence)
   */
  private saveToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const data = Array.from(this.cache.entries()).map(([key, entry]) => [
        key,
        {
          ...entry,
          // Don't cache complex objects that can't be serialized
          data: typeof entry.data === 'object' ? JSON.stringify(entry.data) : entry.data
        }
      ])

      localStorage.setItem('client-cache', JSON.stringify(data))
    } catch (error) {
      console.warn('Failed to save cache to localStorage:', error)
    }
  }

  /**
   * Load cache from localStorage
   */
  private loadFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem('client-cache')
      if (stored) {
        const data = JSON.parse(stored) as Array<[string, CacheEntry<any>]>

        for (const [key, entry] of data) {
          // Skip expired entries
          if (Date.now() <= entry.expiresAt) {
            this.cache.set(key, entry)
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load cache from localStorage:', error)
    }
  }
}

// Singleton instance
export const clientCache = new ClientCache()

// Helper functions for common use cases
export function cacheFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttl?: number
): Promise<T> {
  const cached = clientCache.get<T>(key)

  if (cached !== null) {
    return Promise.resolve(cached)
  }

  return fetcher().then(data => {
    clientCache.set(key, data, ttl)
    return data
  })
}

// Auto-clean expired entries every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    clientCache.cleanExpired()
  }, 10 * 60 * 1000)
}
