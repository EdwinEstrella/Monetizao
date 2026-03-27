import { createClient } from '@insforge/sdk';

/**
 * Cliente de InsForge para uso en componentes del cliente
 * NO usar en server components o rutas API
 */
const insforge = createClient({
  baseUrl: process.env.NEXT_PUBLIC_INSFORGE_BASE_URL || 'https://base.monetizao.com',
  anonKey: process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || ''
});

export default insforge;
