import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Página no encontrada',
  description: 'Lo sentimos, la página que buscas no existe.',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="text-2xl mt-4 mb-8">Página no encontrada</h2>
      <p className="text-lg text-center mb-8">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link href="/" className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Volver a la página de inicio
      </Link>
    </div>
  );
}