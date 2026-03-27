'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const categories = [
  { name: 'ChatGPT para Negocios', slug: 'chatgpt-para-negocios', count: 2 },
  { name: 'IA Visual y Creativa', slug: 'ia-visual-y-creativa', count: 1 },
  { name: 'Automatización y Sistemas', slug: 'automatizacion-y-sistemas', count: 1 },
  { name: 'Prompts y Plantillas', slug: 'prompts-y-plantillas', count: 1 },
  { name: 'Marketing y Ventas', slug: 'marketing-y-ventas', count: 1 },
  { name: 'Consultoría y Servicios', slug: 'consultoria-y-servicios', count: 1 },
  { name: 'Finanzas e Inversión', slug: 'finanzas-e-inversion', count: 1 },
  { name: 'E-commerce y Negocios Online', slug: 'e-commerce-y-negocios-online', count: 1 },
  { name: 'Content Creation', slug: 'content-creation', count: 1 },
  { name: 'Servicios y Freelance', slug: 'servicios-y-freelance', count: 1 },
]

export function CategoryDropdown({ className, onClose }: { className?: string; onClose?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Categorías</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-popover border rounded-md shadow-lg z-50">
          <div className="p-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => {
                  setIsOpen(false)
                  onClose?.()
                }}
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">({category.count})</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}