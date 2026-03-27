'use client'

import Link from 'next/link'
import { CategoryDropdown } from '@/components/ui/category-dropdown'
import { SearchBar } from '@/components/ui/search-bar'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

// Define la navegación FUERA del componente como constante
const NAVIGATION = [
  { name: 'Inicio', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Nosotros', href: '/sobre-nosotros' },
  { name: 'Contacto', href: '/contacto' },
] as const

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60" />
          <span className="text-xl font-bold">Monetizao</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {NAVIGATION.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <CategoryDropdown />
          <SearchBar />
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          {/* Login button - Desktop */}
          <Link
            href="/auth/login"
            className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2"
          >
            Login
          </Link>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-2 px-4 py-4 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Buscador en menú móvil */}
            <div className="py-2">
              <SearchBar />
            </div>

            {/* Categorías en menú móvil */}
            <div className="py-2">
              <CategoryDropdown onClose={() => setIsMenuOpen(false)} />
            </div>

            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium transition-colors hover:text-primary py-3 px-2 rounded-md hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Login button - Mobile */}
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors bg-blue-500 text-white hover:bg-blue-600 h-10 px-4 py-2 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}