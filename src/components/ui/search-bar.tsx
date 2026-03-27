'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X, ExternalLink } from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  excerpt: string
  slug: string
  category?: string
}

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [isOpen])

  // Búsqueda en tiempo real con debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      performSearch(query)
    }, 300)

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [query])

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        `/api/articles?search=${encodeURIComponent(searchQuery.trim())}&limit=5`
      )

      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      const articles = data.success ? data.data : []

      const searchResults: SearchResult[] = articles.map((article: any) => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt || 'Sin descripción disponible',
        slug: article.slug,
        category: article.category || 'Sin categoría'
      }))

      setResults(searchResults)
      setSelectedIndex(0)
    } catch (error) {
      console.error('Search error:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpen = () => {
    setIsOpen(true)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const handleClose = () => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(query.trim())}`
      handleClose()
    }
  }

  const handleResultClick = (slug: string) => {
    handleClose()
    window.location.href = `/blog/${slug}`
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev === 0 ? results.length - 1 : prev - 1)
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault()
      handleResultClick(results[selectedIndex].slug)
    } else if (e.key === 'Escape') {
      handleClose()
    }
  }

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, index) =>
      regex.test(part) ? <mark key={index} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark> : part
    )
  }

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={handleOpen}
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
      >
        <Search className="h-4 w-4 mr-2" />
        Buscar artículos
      </button>

      {isOpen && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl">
          <div className="bg-background border border-border rounded-lg shadow-xl">
            {/* Search Input */}
            <div className="p-4 border-b border-border">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Buscar artículos..."
                    className="w-full pl-10 pr-10 py-3 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    autoFocus
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('')
                        setResults([])
                        inputRef.current?.focus()
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 px-3 py-2"
                >
                  Cancelar
                </button>
              </form>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading && (
                <div className="p-8 text-center text-muted-foreground">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3"></div>
                  <p className="text-sm">Buscando artículos...</p>
                </div>
              )}

              {!isLoading && query && results.length > 0 && (
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {results.length} resultado{results.length !== 1 ? 's' : ''}
                  </div>
                  <div className="space-y-1">
                    {results.map((result, index) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result.slug)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full text-left p-3 rounded-md transition-all hover:bg-accent hover:shadow-sm ${
                          selectedIndex === index ? 'bg-accent shadow-sm border border-border/50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm mb-1 line-clamp-2 leading-tight">
                              {highlightMatch(result.title, query)}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-2">
                              {highlightMatch(result.excerpt, query)}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-primary font-medium">
                                {result.category}
                              </span>
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && query && results.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium mb-1">No se encontraron artículos</p>
                  <p className="text-xs">Intenta con otros términos de búsqueda</p>
                </div>
              )}

              {!query && (
                <div className="p-8 text-center text-muted-foreground">
                  <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">Empieza a escribir para buscar artículos</p>
                  <p className="text-xs mt-1">Busca por título, contenido o categoría</p>
                </div>
              )}
            </div>

            {/* Footer with hints */}
            <div className="border-t border-border p-3 text-xs text-muted-foreground bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">↑↓</kbd>
                    Navegar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Enter</kbd>
                    Seleccionar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-background border border-border rounded text-xs">Esc</kbd>
                    Cerrar
                  </span>
                </div>
                <div className="text-xs">
                  {query && results.length > 0 && (
                    <span>Presiona <kbd className="px-1 py-0.5 bg-background border border-border rounded">Enter</kbd> sobre un artículo para verlo</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}