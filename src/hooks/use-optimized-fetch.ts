/**
 * Optimized data fetching hook with caching, deduplication, and performance improvements
 * Based on SWR pattern but with additional optimizations
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { clientCache } from '@/lib/client-cache'

interface UseOptimizedFetchOptions<T> {
  ttl?: number // Time to live in cache
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  dedupingInterval?: number
  onSuccess?: (data: T) => void
  onError?: (error: Error) => void
}

interface UseOptimizedFetchResult<T> {
  data: T | null
  error: Error | null
  isLoading: boolean
  isValidating: boolean
  mutate: (data?: T | Promise<T> | ((currentData?: T) => T | Promise<T>)) => Promise<T | undefined>
  revalidate: () => Promise<void>
}

export function useOptimizedFetch<T>(
  key: string | null,
  fetcher: () => Promise<T>,
  options: UseOptimizedFetchOptions<T> = {}
): UseOptimizedFetchResult<T> {
  const {
    ttl = 5 * 60 * 1000, // 5 minutes default
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    dedupingInterval = 2000, // 2 seconds
    onSuccess,
    onError
  } = options

  const [data, setData] = useState<T | null>(() => {
    // Initialize from cache if available
    if (key) {
      return clientCache.get<T>(key)
    }
    return null
  })
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  // Refs to prevent stale closures
  const fetcherRef = useRef(fetcher)
  const keyRef = useRef(key)
  const lastFetchTimeRef = useRef(0)

  // Update refs when values change
  useEffect(() => {
    fetcherRef.current = fetcher
    keyRef.current = key
  }, [fetcher, key])

  // Main fetch function
  const fetchAndSetData = useCallback(async (isBackground = false): Promise<void> => {
    if (!key) return

    const now = Date.now()

    // Deduplicate requests within interval
    if (now - lastFetchTimeRef.current < dedupingInterval && !isBackground) {
      return
    }

    lastFetchTimeRef.current = now

    if (!isBackground) {
      setIsLoading(true)
    }
    setIsValidating(true)
    setError(null)

    try {
      const result = await fetcherRef.current()

      // Update state
      setData(result)
      setError(null)

      // Cache result
      clientCache.set(key, result, ttl)

      // Success callback
      if (onSuccess) {
        onSuccess(result)
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred')
      setError(error)

      // Error callback
      if (onError) {
        onError(error)
      }
    } finally {
      setIsLoading(false)
      setIsValidating(false)
    }
  }, [key, ttl, dedupingInterval, onSuccess, onError])

  // Revalidate function
  const revalidate = useCallback(async () => {
    await fetchAndSetData(true)
  }, [fetchAndSetData])

  // Mutate function
  const mutate = useCallback(async (newData?: T | Promise<T> | ((currentData?: T) => T | Promise<T>)): Promise<T | undefined> => {
    if (newData === undefined) {
      // Trigger revalidation
      await fetchAndSetData(true)
      return
    }

    // Calculate new data
    const promiseData = typeof newData === 'function'
      ? (newData as (currentData?: T) => T | Promise<T>)(data as T)
      : newData

    const dataToSet = await promiseData

    // Optimistic update
    setData(dataToSet)
    clientCache.set(key as string, dataToSet, ttl)

    return dataToSet
  }, [data, key, ttl, fetchAndSetData])

  // Initial fetch
  useEffect(() => {
    if (!key) return

    // Check cache first
    const cached = clientCache.get<T>(key)

    if (cached !== null) {
      setData(cached)

      // Revalidate in background
      fetchAndSetData(true)
    } else {
      // Initial fetch
      fetchAndSetData()
    }
  }, [key])

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus || !key) return

    const handleFocus = () => {
      fetchAndSetData(true)
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [revalidateOnFocus, key, fetchAndSetData])

  // Revalidate on reconnect
  useEffect(() => {
    if (!revalidateOnReconnect || !key) return

    const handleReconnect = () => {
      fetchAndSetData(true)
    }

    window.addEventListener('online', handleReconnect)
    return () => window.removeEventListener('online', handleReconnect)
  }, [revalidateOnReconnect, key, fetchAndSetData])

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    revalidate
  }
}

// Hook for fetching multiple keys in parallel
export function useOptimizedFetchParallel<T>(
  keys: string[],
  fetchers: (() => Promise<T>)[],
  options: UseOptimizedFetchOptions<T> = {}
): UseOptimizedFetchResult<T>[] {
  return keys.map((key, index) =>
    useOptimizedFetch(key, fetchers[index], options)
  )
}
