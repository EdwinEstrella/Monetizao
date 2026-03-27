'use client'

export default function SearchPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">
          Búsqueda
        </h1>
        <p className="text-muted-foreground">
          Función de búsqueda temporalmente deshabilitada para mantenimiento.
        </p>
        <div className="mt-6">
          <a href="/blog" className="text-primary hover:underline">
            ← Volver al blog
          </a>
        </div>
      </div>
    </div>
  )
}