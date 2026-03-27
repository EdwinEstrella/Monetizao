export interface PromptVariable {
  key: string
  label: string
  type: 'text' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export interface PromptTemplate {
  id: string
  title: string
  description: string
  category: string
  isPremium: boolean
  variables: PromptVariable[]
  prompt: string
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: '1',
    title: 'Copywriting de Alto Conversión',
    description: 'Crea textos publicitarios que convierten',
    category: 'Marketing',
    isPremium: false,
    variables: [
      { key: 'tipo_de_contenido', label: 'Tipo de Contenido', type: 'select', options: ['Email', 'Landing Page', 'Post Social Media', 'Anuncio', 'Artículo de Blog'] },
      { key: 'producto_servicio', label: 'Producto/Servicio', type: 'text', placeholder: 'Describe tu producto o servicio' },
      { key: 'audiencia_objetivo', label: 'Audiencia Objetivo', type: 'text', placeholder: '¿A quién te diriges?' },
      { key: 'contexto_producto', label: 'Contexto del Producto', type: 'textarea', placeholder: 'Detalles adicionales sobre el producto' },
      { key: 'objetivo_principal', label: 'Objetivo Principal', type: 'text', placeholder: '¿Qué quieres lograr?' },
      { key: 'tono_voz', label: 'Tono de Voz', type: 'select', options: ['Profesional', 'Amigable', 'Urgente', 'Inspirador', 'Divertido'] },
      { key: 'longitud', label: 'Longitud', type: 'select', options: ['Corto (50-100 palabras)', 'Mediano (100-300 palabras)', 'Largo (300+ palabras)'] },
      { key: 'plataforma_destino', label: 'Plataforma', type: 'select', options: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'Email', 'Blog'] }
    ],
    prompt: `Actúa como un experto copywriter con 10 años de experiencia en marketing directo.

Crea un {tipo_de_contenido} para {producto_servicio} que se dirija a {audiencia_objetivo}.

Contexto del producto/servicio: {contexto_producto}

Objetivo principal: {objetivo_principal}

Tono de voz: {tono_voz}

Longitud aproximada: {longitud}

Incluye:
1. Hook inicial irresistible
2. Beneficios clave (no características)
3. Prueba social
4. Llamada a la acción clara
5. Optimizado para {plataforma_destino}

Asegúrate de que el contenido siga las fórmulas de copywriting probadas (AIDA, PAS, FAB) y se enfoque en emociones y beneficios.`
  },
  {
    id: '2',
    title: 'Generador de Contenido SEO',
    description: 'Crea contenido optimizado para buscadores',
    category: 'SEO',
    isPremium: false,
    variables: [
      { key: 'keyword_principal', label: 'Keyword Principal', type: 'text', placeholder: 'Tu palabra clave principal' },
      { key: 'topic_principal', label: 'Tema Principal', type: 'text', placeholder: 'El tema principal del artículo' },
      { key: 'audiencia', label: 'Audiencia', type: 'text', placeholder: '¿Quién leerá esto?' },
      { key: 'longitud_articulo', label: 'Longitud del Artículo', type: 'select', options: ['Corto (500-800 palabras)', 'Mediano (800-1500 palabras)', 'Largo (1500+ palabras)'] },
      { key: 'tipo_contenido', label: 'Tipo de Contenido', type: 'select', options: ['Tutorial', 'Guía completa', 'Lista', 'Review', 'Caso de estudio'] }
    ],
    prompt: `Actúa como un experto en SEO y contenido con experiencia en crear artículos que posicionan en Google.

Escribe un {tipo_contenido} sobre "{topic_principal}" optimizado para la keyword "{keyword_principal}".

Audiencia objetivo: {audiencia}
Longitud: {longitud_articulo}

Crea contenido que:

1. **SEO On-Page Optimizado**:
   - Incluye la keyword principal en título y subtítulos
   - Usa palabras clave secundarias naturales
   - Mantén densidad de keyword del 1-2%
   - Incluye meta descripción atractiva

2. **Estructura del Contenido**:
   - Título llamativo (H1)
   - Introducción enganchante
   - Mínimo 3 subtítulos (H2, H3)
   - Lista de puntos clave
   - Conclusión con llamada a acción

3. **Calidad y Valor**:
   - Información original y útil
   - Ejemplos prácticos
   - Datos o estadísticas cuando aplique
   - Lenguaje claro y accesible

4. **Optimización Adicional**:
   - Questions people also ask
   - Entidades y topics relacionados
   - Formato legible con párrafos cortos
   - Negritas para énfasis

Asegúrate de que el contenido responda completamente a la intención de búsqueda y ofrezca valor real al lector.`
  },
  {
    id: '3',
    title: 'Creador de Propuestas Comerciales',
    description: 'Genera propuestas comerciales persuasivas',
    category: 'Negocio',
    isPremium: false,
    variables: [
      { key: 'cliente_potencial', label: 'Cliente Potencial', type: 'text', placeholder: 'Nombre del cliente' },
      { key: 'servicio_descripcion', label: 'Servicio a Ofrecer', type: 'textarea', placeholder: 'Describe tu servicio' },
      { key: 'problema_cliente', label: 'Problema del Cliente', type: 'textarea', placeholder: '¿Qué problema resuelves?' },
      { key: 'solucion_propuesta', label: 'Tu Solución', type: 'textarea', placeholder: '¿Cómo lo resuelves?' },
      { key: 'presupuesto', label: 'Presupuesto', type: 'text', placeholder: 'Rango de presupuesto' },
      { key: 'timeline', label: 'Timeline', type: 'text', placeholder: 'Duración del proyecto' }
    ],
    prompt: `Actúa como un consultor de negocios senior experto en crear propuestas comerciales ganadoras.

Crea una propuesta comercial para: {cliente_potencial}

Servicio a ofertar: {servicio_descripcion}

Presupuesto: {presupuesto}

Problema del cliente: {problema_cliente}

Solución propuesta: {solucion_propuesta}

Timeline: {timeline}

Estructura la propuesta con:
1. Resumen Ejecutivo
2. Análisis del Problema
3. Solución Propuesta
4. Metodología
5. Timeline y Entregables
6. Inversión (con opciones)
7. Garantías
8. Próximos Pasos

Usa lenguaje profesional pero persuasivo, enfocado en ROI y beneficios medibles.`
  }
] as const
