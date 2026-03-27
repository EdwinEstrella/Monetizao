import { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contacto | Monetizao',
  description: 'Contacta con el equipo de Monetizao para obtener ayuda sobre estrategias de monetización con Inteligencia Artificial.',
  openGraph: {
    title: 'Contacto | Monetizao',
    description: 'Contacta con el equipo de Monetizao para obtener ayuda sobre estrategias de monetización con Inteligencia Artificial.',
    url: 'https://monetizao.com/contacto',
  },
}

export default function ContactPage() {
  return <ContactForm />
}